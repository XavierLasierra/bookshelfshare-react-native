const User = require('../models/user.model');

async function getUsers({ query }, res) {
  try {
    const foundUsers = await User.find(query).select('username email photo activity books');

    res.json(foundUsers);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

async function getOneUserById({ params: { userId } }, res) {
  try {
    const foundUser = await User.findById(userId).select('username email photo activity books');

    if (!foundUser) return res.sendStatus(404);

    return res.json(foundUser);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}
async function deleteOneUserById({ params: { userId } }, res) {
  try {
    await User.findByIdAndDelete(userId);

    res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}
async function updateOneUserById({ params: { userId }, body }, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      body,
      { new: true }
    ).select('username email photo activity books');

    if (!updatedUser) return res.sendStatus(404);

    return res.json(updatedUser);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}

module.exports = {
  getUsers,
  getOneUserById,
  deleteOneUserById,
  updateOneUserById
};
