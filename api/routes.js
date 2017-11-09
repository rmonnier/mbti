const user = require('./controllers/user');
const authentication = require('./controllers/authentication');

const routes = async (app, passport) => {
  /**
   * Authentication routes. (Sign in)
   */
  app.post('/api/signin', authentication.local);
  app.get('/api/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
  app.get('/api/auth/facebook/callback', authentication.facebook);
  app.get('/api/auth/google', passport.authenticate('google', { scope: 'profile email' }));
  app.get('/api/auth/google/callback', authentication.google);
  app.get('/api/auth/linkedin', passport.authenticate('linkedin'));
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
