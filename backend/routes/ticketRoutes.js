const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getTickets,
  createTickets,
  getTicket,
} = require('../controllers/ticketController');

router.route('/').get(protect, getTickets).post(protect, createTickets);
router.route('/:id').get(protect, getTicket);

module.exports = router;
