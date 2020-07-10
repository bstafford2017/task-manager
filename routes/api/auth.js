import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/keys.js";
import auth from "../../middleware/auth.js";

// User Modal
import User from "../../models/User.js";

const Router = express.Router();

// @route   POST api/auth/login
// @desc    Authenticate user
// @access  Public
Router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User does not exist.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials.");

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 3600,
    });
    if (!token) throw new Error("Could not sign token.");

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        admin: user.admin,
      },
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
Router.post("/register", async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;

  if (!username || !password || !firstName || !lastName || !email) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for unique username
    const foundUsername = await User.findOne({ username });
    if (foundUsername) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    // Check for unique email
    const foundEmail = await User.findOne({ email });
    if (foundEmail) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Create salt and hash
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw new Error("Something went wrong with bcrypt");

    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword)
      throw new Error("Something went wrong hashing the password");

    const newUser = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      admin: false,
    });

    const savedUser = await newUser.save();

    const token = await jwt.sign({ id: savedUser.id }, config.secret, {
      expiresIn: 3600,
    });

    // Send back user without password
    res.json({
      token,
      user: {
        id: savedUser.id,
        username: savedUser.username,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        admin: savedUser.admin,
      },
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// @route   POST api/auth/:id
// @desc    Update user
// @acc     Private
Router.post("/:id", auth, async (req, res) => {
  res.json(
    await User.findOneAndUpdate({ id: res }, req.body.user, {
      upsert: false,
    })
  );
});

// @route   DELETE api/auth/:id
// @desc    Delete user
// @acc     Private
Router.delete("/:id", auth, async (req, res) => {
  res.json(await User.findById({ id: res.params.id }).remove());
});

// @route   GET api/auth/user
// @desc    Get user data
// @acc     Private
Router.get("/user", auth, async (req, res) => {
  res.json(await User.findById(req.user.id));
});

export default Router;
