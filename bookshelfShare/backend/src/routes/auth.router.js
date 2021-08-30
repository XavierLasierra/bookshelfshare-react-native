const { Router } = require('express');
const passport = require('passport');
const {
  registerUser,
  loginUser,
  refreshUserToken,
  logoutUser
} = require('../controllers/auth.controller');

const authRouter = new Router();

authRouter
  .post(
    '/register',
    passport.authenticate('signup', { session: false }),
    registerUser
  );

authRouter
  .post(
    '/login',
    passport.authenticate('login', { session: false }),
    loginUser
  );

authRouter
  .post(
    '/refreshToken',
    refreshUserToken
  );

authRouter
  .post(
    '/logout',
    logoutUser
  );

module.exports = authRouter;
