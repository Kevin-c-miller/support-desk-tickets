const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getTickets,
  createTickets,
} = require('../controllers/ticketController');

router.route('/').get(protect, getTickets).post(protect, createTickets);

module.exports = router;
