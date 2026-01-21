const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, phone, email, city, password } = req.body;

    if (!name || !phone || !email || !city || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      phone,
      email,
      city,
      password: hashed
    });

    await user.save();

    res.json({ msg: "Signup success" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
