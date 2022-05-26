const express = require("express");
const User = require("../models/User");
const router = express.Router();
const cors = require("cors");
console.log(typeof User);
router.use(cors());
//change name on usermodel

//creating a User
///users/
router.post("/", async (req, res) => {
  try {
    console.log("running");
    let user = new User(req.body);
    user = await user.save();
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

// login
//users/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    let user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      let newUser = { email: user.email, id: user._id };
      res.status(200).json({
        status: 200,
        data: newUser,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "invalid email or password",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// get email & subscription
//users/list/
router.get("/list", async (req, res) => {
  try {
    let users = await User.find({}, { email: 1, subscription: 1 });
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

// get subscription
router.get("/:userId", async (req, res) => {
  try {
    let user = await User.findById(req.params.userId, {
      email: 1,
      subscription: 1,
    });
    if (user) {
      res.status(200).json({
        status: 200,
        data: user,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No user found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// find subscription for user and update
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
    } else {
      res.status(400).json({
        status: 400,
        message: "No user found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
