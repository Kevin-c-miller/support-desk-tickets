const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// function to protect routes
const protect = asyncHandler(async (req, res, next) => {
  //   initialize token variable
  let token;

  //   check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //  get token from header (splits into array, splitting at the space so it will look like ['bearer', 'token'] , token will be at the 1 index)
      token = req.headers.authorization.split(' ')[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token using decoded variable (which has id) and excluding the password using the select keyword and minus sign password
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized');
  }
});

module.exports = { protect };
