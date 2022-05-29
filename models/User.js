const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    subscription: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// compare password from database with password in frontend
userSchema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword == this.password;
};
let User = mongoose.model("user", userSchema);

module.exports = User;
