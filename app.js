const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./config");

const usersRouter = require("./routes/users");
//const indexRouter = require("./routes/index");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const dbUrl = config.dbUrl;

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

app.use(cors());
//app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
