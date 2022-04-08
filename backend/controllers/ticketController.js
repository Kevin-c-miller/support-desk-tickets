const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// get user tickets
// @route GET /api/tickets/
// @access private
const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'get Tickets' });
});

// create new user tickets
// @route POST /api/tickets/
// @access private
const createTickets = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'create ticket' });
});

module.exports = {
  getTickets,
  createTickets,
};
