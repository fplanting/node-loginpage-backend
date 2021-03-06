const express = require("express");
const User = require("../models/User");
const router = express.Router();
const cors = require("cors");
router.use(cors());

// login on admin
router.post("/login", async (req, res) => {
  if (req.body.password && req.body.password == "admin") {
    req.session.loggedin = true;
  }
  res.redirect("/");
});

// get list of emails & subscriptions
router.get("/list", async (req, res) => {
  if (!req.session.loggedin) {
    res.status(400).json({
      status: 400,
      message: "no permissions",
    });
    return;
  }
  try {
    let users = await User.find({}, { email: 1, subscription: 1 });

    res.status(200).json({
      status: 200,
      data: users,
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
