const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
});

let User = mongoose.model("user", userSchema);
