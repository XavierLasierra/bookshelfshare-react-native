/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

let refreshTokens = [];

async function registerUser({ user, body: { username } }, res) {
  try {
    const createdUser = await User.create({ ...user, username });

    res.status(201);
    res.json({
      createdUser,
      message: 'User registered'
    });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

function loginUser({ user }, res) {
  const data = { _id: user._id, email: user.email };
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
}

function verifyToken(err, user, res) {
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
}

function refreshUserToken({ body: { refreshToken } }, res) {
  if (!refreshToken) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  return jwt.verify(
    refreshToken,
    process.env.JWT_SECRET,
    (err, { user }) => verifyToken(err, user, res)
  );
}

function logoutUser({ body: { refreshToken } }, res) {
  if (!refreshToken) {
    return res.sendStatus(401);
  }

  refreshTokens = refreshTokens.filter((current) => current !== refreshToken);

  return res.send('Logout successful');
}

module.exports = {
  registerUser,
  loginUser,
  refreshUserToken,
  logoutUser,
  verifyToken
};