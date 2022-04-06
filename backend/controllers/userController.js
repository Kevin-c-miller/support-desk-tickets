// Register a new user
// @route /api/users
// @access public
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  //  validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }
  res.send('register route');
};

// Login a user
// @route /api/users/login
// @access public
const loginUser = (req, res) => {
  res.send('login route');
};

module.exports = {
  registerUser,
  loginUser,
};
