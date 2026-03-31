const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 12,
    select: false, // 🔥 never return password
  },

  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// 🔐 HASH PASSWORD
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (this.password.length < 12) {
    return next(new Error("Password must be at least 12 characters"));
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔑 COMPARE PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);