const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Register a new user
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  // destructure out of request body
  const { name, email, password } = req.body;

  //  validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  //   Find if user already exists
  const userExists = await User.findOne({ email });

  // if user exists
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // hash the password using bcryptjs
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  //   if user is created
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login a user
// @route /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  // destrucure out of request body
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // if user found and pw matches
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    //   unauthorized http status
    res.status(401);
    throw new Error('Invalid Credentials');
  }
});

// generate token function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
};
