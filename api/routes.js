const user = require('./controllers/user');
const authentication = require('./controllers/authentication');

const routes = async (app, passport) => {
  /**
   * Authentication routes. (Sign in)
   */
  app.post('/api/signin', authentication.local);
  app.get('/api/auth/facebook', (req, res) => {
    passport.authenticate('facebook', {  scope: ['email', 'public_profile', 'user_friends'], callbackURL: req.headers.referer })(req, res);
  });
  app.get('/api/auth/facebook/callback', authentication.facebook);
  app.get('/api/auth/google', (req, res) => {
    passport.authenticate('google', { scope: 'profile email', callbackURL: req.headers.referer })(req, res);
  });
  app.get('/api/auth/google/callback', authentication.google);
  app.get('/api/auth/linkedin', (req, res) => {
    passport.authenticate('linkedin', { callbackURL: req.headers.referer })(req, res);
  });
  app.get('/api/auth/linkedin/callback', authentication.linkedin);
  app.use('/oauth', (req, res) => {
    res.end();
  });

  /**
   * Unlogged routes.
   */
  app.post('/api/signup/info', user.postSignup);
  app.post('/api/forgot', user.postForgot);
  app.post('/api/reset/:token', user.postReset);


  /**
   * Logged routes. (Sign in)
   */
  app.use('/api', passport.authenticate('jwt', { session: false }));
  app.get('/api/me', user.getMyAccount);
  app.post('/api/me', user.postUpdateProfile);
  app.delete('/api/me', user.deleteDeleteAccount); // not implemented
  app.get('/api/profile/:name', user.getAccount);
  app.get('/api/profile/id/:id', user.getAccountById);
};

module.exports = routes;
