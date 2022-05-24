const express = require("express");
const User = require("../models/User");
const router = express.Router();

//creating a User
router.post("/", async (req, res) => {
  try {
    let user = new User(req.body);
    user = await User.save();
    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// get all users
//change later so just find the emails i think
router.get("/users", async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json({
      status: 200,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// find just one user
//change to login and check if the person is logged in
router.get("/:userId", async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.params.userId,
    });
    if (user) {
      res.status(200).json({
        status: 200,
        data: user,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No user found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// find one user and update
//change this later to just change the email
router.put("/:userId", async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    if (user) {
      res.status(200).json({
        status: 200,
        data: user,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No post found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// delete a user, maybe not needed
router.delete("/:userId", async (req, res) => {
  try {
    let user = await User.findByIdAndRemove(req.params.userId);
    if (user) {
      res.status(200).json({
        status: 200,
        message: "Post deleted successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No post found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// router.post("/login", (req, res) => {
//   res.send("inlogg");
// });

// router.post("/addUser", (req, res) => {
//   res.send("addUser");
// });

module.exports = router;
