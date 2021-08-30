/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const refreshTokens = [];

async function registerUser({ user, body: { username } }, res) {
  try {
    const createdUser = await User.create({ ...user, username });

    res.json({
      createdUser,
      message: 'User registered'
    });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

async function loginUser({ user }, res) {
  const data = { _id: user._id, email: user.email };
  try {
    const token = jwt.sign(
      { user: data },
      process.env.JWT_SECRET,
      { expiresIn: '1m' }
    );
    const refreshToken = jwt.sign(
      { user: data },
      process.env.JWT_SECRET
    );

    refreshTokens.push(refreshToken);

    res.json({
      user,
      token,
      refreshToken
    });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

module.exports = {
  registerUser,
  loginUser
};
