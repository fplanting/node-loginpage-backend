const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

//see if crypto is better
//bcrypt for crypting password with salt
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// compare password from database with password in frontend
userSchema.methods.matchPassword = async function (enteredPassword) {
  // return await bcrypt.compare(enteredPassword, this.password);
  return enteredPassword == this.password;
};
let User = mongoose.model("user", userSchema);

module.exports = User;
