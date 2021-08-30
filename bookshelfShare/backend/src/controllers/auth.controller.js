const User = require('../models/user.model');

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

module.exports = {
  registerUser
};
