const User = require("../models/user.model");
const { transformQuery } = require("../utils/transformQuery");

async function getUsers({ query }, res) {
  try {
    const transformedQuery = transformQuery(query);

    const foundUsers = await User.find({ $or: transformedQuery })
      .limit(20)
      .select("username email photo activity books following followers");

    res.json(foundUsers);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

async function getOneUserById({ params: { userId } }, res) {
  try {
    const foundUser = await User.findById(userId)
      .select("username email photo activity books following followers")
      .populate({
        path: "followers following",
        select: "username email photo",
      });

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
    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
    }).select("username email photo activity books following followers");

    if (!updatedUser) return res.sendStatus(404);

    return res.json(updatedUser);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}

async function updateUserBooks({ body, params: { userId } }, res) {
  try {
    const foundUser = await User.findById(userId).select(
      "username email photo activity books following followers"
    );
    if (!foundUser) return res.sendStatus(404);

    if (body.deleteFrom) {
      foundUser.books[body.deleteFrom] = foundUser.books[
        body.deleteFrom
      ].filter((bookIsbn) => bookIsbn !== body.bookIsbn);
    }
    if (body.addTo) {
      foundUser.books[body.addTo].push(body.bookIsbn);
    }
    foundUser.save();

    return res.json(foundUser);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}

async function addUserFollowing(
  { body: { followingId }, params: { userId } },
  res
) {
  try {
    const foundUser = await User.findById(userId).select(
      "username email photo activity books following followers"
    );
    if (!foundUser) return res.sendStatus(404);

    const followingUser = await User.findById(followingId);
    if (!followingUser) return res.sendStatus(404);

    if (foundUser.following.some((user) => `${user}` === followingId))
      return res.sendStatus(409);

    foundUser.following.push(followingId);
    followingUser.followers.push(userId);

    foundUser.save();
    followingUser.save();

    await foundUser.populate({
      path: "followers following",
      select: "username email photo",
    });

    return res.json(foundUser);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}

async function deleteUserFollowing(
  { body: { followingId }, params: { userId } },
  res
) {
  try {
    const foundUser = await User.findById(userId).select(
      "username email photo activity books following followers"
    );
    if (!foundUser) return res.sendStatus(404);

    const followingUser = await User.findById(followingId);
    if (!followingUser) return res.sendStatus(404);

    foundUser.following = foundUser.following.filter(
      (user) => `${user}` !== followingId
    );
    followingUser.followers = followingUser.followers.filter(
      (user) => `${user}` !== userId
    );

    foundUser.save();
    followingUser.save();

    await foundUser.populate({
      path: "followers following",
      select: "username email photo",
    });

    return res.json(foundUser);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}

module.exports = {
  getUsers,
  getOneUserById,
  deleteOneUserById,
  updateOneUserById,
  updateUserBooks,
  addUserFollowing,
  deleteUserFollowing,
};
