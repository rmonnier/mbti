const passport = require('passport');
const jwt = require('jsonwebtoken');
const checkReq = require('./checkReq');

/**
 * POST /signin
 * Sign in using email and password.
 */
exports.local = async (req, res, next) => {
  const error = await checkReq(req);

  if (error.length) {
    return res.send({ error });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.send({ error: info });
    }
    const token = jwt.sign({ _id: user._id, email: user.email, provider: 'local' }, process.env.SESSION_SECRET);
    const { lang } = user.profile;
    res.set('Access-Control-Expose-Headers', 'x-access-token');
    res.set('x-access-token', token);
    res.set('lang-user', lang || 'en-en');
    res.send({ error: '' });
  })(req, res, next);
};

/**
 * GET /api/auth/facebook/callback
 * Sign in using Facebook.
 */
exports.facebook = async (req, res, next) => {
  passport.authenticate('facebook', { callbackURL: req.headers.referer }, (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.send({ error: info });
    }
    const token = jwt.sign({ _id: user._id, email: user.email, provider: 'facebook' }, process.env.SESSION_SECRET);
    const { lang } = user.profile;
    res.set('Access-Control-Expose-Headers', 'x-access-token');
    res.set('x-access-token', token);
    res.set('lang-user', lang || 'en-en');
    res.send({ error: '' });
  })(req, res, next);
};

/**
 * GET /api/auth/google/callback
 * Sign in using Google.
 */
exports.google = async (req, res, next) => {
  passport.authenticate('google', { callbackURL: req.headers.referer }, (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.send({ error: info });
    }
    const token = jwt.sign({ _id: user._id, email: user.email, provider: 'google' }, process.env.SESSION_SECRET);
    const { lang } = user.profile;
    res.set('Access-Control-Expose-Headers', 'x-access-token');
    res.set('x-access-token', token);
    res.set('lang-user', lang || 'en-en');
    res.send({ error: '' });
  })(req, res, next);
};


/**
 * GET /api/auth/linkedin/callback
 * Sign in using Linkedin.
 */

exports.linkedin = (req, res, next) => {
  passport.authenticate('linkedin', { callbackURL: req.headers.referer }, (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.send({ error: info });
    }
    const token = jwt.sign({ _id: user._id, email: user.email, provider: 'linkedin' }, process.env.SESSION_SECRET);
    const { lang } = user.profile;
    res.set('Access-Control-Expose-Headers', 'x-access-token');
    res.set('x-access-token', token);
    res.set('lang-user', lang || 'en-en');
    res.send({ error: '' });
  })(req, res, next);
};
