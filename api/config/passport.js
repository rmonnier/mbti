const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const User = require('../models/User');

const passportConfig = (passport) => {
  /**
   * Sign in using Email and Password.
   */

  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, [{ param: 'email', msg: 'error.noEmailUsed', value: email }]);
      }
      if (!user.password) {
        return done(null, false, [{ param: 'password', msg: 'error.noPassword' }]);
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, [{ param: 'password', msg: 'error.incorrectPassword' }]);
      });
    });
  }));

  /**
   * Authenticate JWT in requests headers
   */

  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromHeader('x-access-token');
  opts.secretOrKey = process.env.SESSION_SECRET;

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findById(jwtPayload._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) { return done(null, user); }
      return done(null, false);
    });
  }));


  /**
   * OAuth Strategy Overview
   *
   * - User is already logged in.
   *   - Check if there is an existing account with a provider id.
   *     - If there is, return an error message. (Account merging not supported)
   *     - Else link new OAuth account with currently logged-in user.
   * - User is not logged in.
   *   - Check if it's a returning user.
   *     - If returning user, sign in and we are done.
   *     - Else check if there is an existing account with user's email.
   *       - If there is, return an error message.
   *       - Else create a new account.
   */

  /**
  * Sign in with Facebook.
  */

  passport.use('facebook', new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/oauth/facebook/callback',
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email'],
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookId: profile.id }, (err, existingUser) => {
      if (err) return done(err);
      User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
        if (err) return done(err);
        if (existingUser) return done(null, existingUser);
        if (existingEmailUser) {
          existingEmailUser.facebook = profile.id;
          existingEmailUser.tokens.push({ kind: 'facebook', accessToken });
          existingEmailUser.save((err) => {
            done(err, existingEmailUser);
          });
        } else {
          const user = new User();
          user.facebook = profile.id;
          user.email = profile.emails[0].value;
          user.tokens.push({ kind: 'facebook', accessToken });
          if (profile.name.givenName !== undefined && profile.name.familyName !== undefined) {
            user.profile.firstName = profile.name.givenName;
            user.profile.lastName = profile.name.familyName;
          } else {
            const name = profile.displayName.split(' ');
            user.profile.firstName = name[0];
            user.profile.lastName = name[1];
          }
          user.profile.pictureURL = profile.photos[0].value;
          user.save((err) => {
            done(err, user);
          });
        }
      });
    });
  }));

  passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_ID,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: '/oauth',
    scope: ['r_emailaddress', 'r_basicprofile'],
  }, (req, accessToken, refreshToken, profile, done) => {
    User.findOne({ linkedin: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) return done(null, existingUser);
      User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
        if (err) return done(err);
        if (existingEmailUser) {
          existingEmailUser.linkedin = profile.id;
          existingEmailUser.tokens.push({ kind: 'linkedin', accessToken });
          existingEmailUser.save((err) => {
            done(err, existingEmailUser);
          });
        } else {
          const user = new User();
          user.email = profile.emails[0].value;
          user.linkedin = profile.id;
          user.tokens.push({ kind: 'linkedin', accessToken });
          user.profile.firstName = profile.name.givenName;
          user.profile.lastName = profile.name.familyName;
          user.profile.pictureURL = profile._json.pictureUrl;
          user.save((err) => {
            done(err, user);
          });
        }
      });
    });
  }));
};


/**
 * Authorization Required middleware.
 */
const isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];
  const token = req.user.tokens.find(token => token.kind === provider);
  if (token) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};

module.exports = passportConfig;
