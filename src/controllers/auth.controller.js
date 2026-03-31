const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { isBreached } = require("../utils/passwordCheck");

// 🔐 GENERATE TOKEN
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// 📝 REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check breached password
    if (await isBreached(password)) {
      return res.status(400).json({
        message: "Password found in data breach. Choose another.",
      });
    }

    const user = await User.create({ name, email, password });

    const token = generateToken(user);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔐 LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔁 REQUEST PASSWORD RESET
exports.requestReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "If account exists, reset link sent" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    res.json({
      message: "Reset token generated",
      token, // ⚠️ for testing (in real app send email)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔁 RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔑 CHANGE PASSWORD (AUTH REQUIRED)
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const { oldPassword, newPassword } = req.body;

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        message: "Old password incorrect",
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};