const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

// routes
router.post('/', registerUser);
router.post('/login', loginUser);

// protect function goes as second arg. for any route you want to protect
router.get('/me', protect, getMe);

module.exports = router;
