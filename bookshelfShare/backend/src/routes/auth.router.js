/* eslint-disable no-underscore-dangle */
const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
  registerUser,
  loginUser
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
    (req, res) => {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.sendStatus(401);
      }

      if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403);
      }

      return jwt.verify(refreshToken, process.env.JWT_SECRET, (err, { user }) => {
        if (err) {
          return res.sendStatus(403);
        }

        const data = { _id: user._id, email: user.email };

        const token = jwt.sign(
          { user: data },
          process.env.JWT_SECRET,
          { expiresIn: '1m' }
        );

        return res.json({
          token
        });
      });
    }
  );

authRouter.post('/logout', (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter((current) => current !== refreshToken);

  res.send('Logout successful');
});

module.exports = authRouter;
