const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* ================= REGISTER / SIGNUP ================= */
const registerUser = async (req, res) => {
  try {
    const { name, phone, email, city, password } = req.body;

    if (!name || !phone || !email || !city || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      phone,
      email,
      city,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    console.error("Register error:", error);

    // Duplicate key (email / phone)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    res.status(500).json({
      message: "Server error"
    });
  }
};

// Support BOTH routes
router.post("/register", registerUser);
router.post("/signup", registerUser);


/* ================= SIGNIN ================= */
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login success",
      token
    });

  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;
