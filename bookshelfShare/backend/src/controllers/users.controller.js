const User = require('../models/user.model');

async function getUsers({ query }, res) {
  try {
    const foundUsers = await User.find(query);

    res.json(foundUsers);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

module.exports = {
  getUsers
};
