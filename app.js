require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");

const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

//saving password in cookie-session, that only server getting access to
//helps if you login right, you will stay inlogged
app.use(
  session({
    secret: "2C44-4D44-WppQ38S",
    resave: true,
    saveUninitialized: true,
  })
);

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  options,
  (err) => {
    if (err) console.log(err);
  }
);

app.use(cors());
app.use("/admin", adminRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  if (req.session && req.session.loggedin)
    res.sendFile(__dirname + "/public/admin.html");
  else res.sendFile(__dirname + "/public/login.html");
});

module.exports = app;
