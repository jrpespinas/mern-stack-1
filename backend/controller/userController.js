const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const user = require("../models/user");

/**
 * Get a user.
 *
 * @access public
 * @route GET /api/users/me
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name: name,
    email: email,
  });
});

/**
 * Creates a new user.
 *
 * @access public
 * @route GET /api/users
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check for fields values
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check for existing users
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * Authenticate a user.
 *
 * @access public
 * @route POST /api/users/login
 *
 * @param {string} req request
 * @param {string} res response
 *
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

/**
 * Generate a token.
 *
 * @param {string} id user id
 *
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
