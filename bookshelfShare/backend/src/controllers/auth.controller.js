const User = require('../models/user.model');

async function registerUser({ user, body: { username } }, res) {
  const createdUser = await User.create({ ...user, username });

  res.json({
    createdUser,
    message: 'User registered'
  });
}

module.exports = {
  registerUser
};
