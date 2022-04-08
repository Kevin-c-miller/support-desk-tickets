const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// get user tickets
// @route GET /api/tickets/
// @access private
const getTickets = asyncHandler(async (req, res) => {
  // get user using the id in the jwt
  const user = await User.findById(req.user.id);

  //   if user not found
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //   find tickets for the user
  const tickets = await Ticket.find({ user: req.user.id });

  //   success
  res.status(200).json(tickets);
});

///////////////////////////////////////////////////////////////////////////

// get user ticket
// @route GET /api/tickets/:id
// @access private
const getTicket = asyncHandler(async (req, res) => {
  // get user using the id in the jwt
  const user = await User.findById(req.user.id);

  //   if user not found
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //   find ticket
  const ticket = await Ticket.findById(req.params.id);

  //    if ticket not found
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  //   if ticket doesnt belong to the user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  //   success
  res.status(200).json(ticket);
});

///////////////////////////////////////////////////////////////////////////

// create new user tickets
// @route POST /api/tickets/
// @access private
const createTickets = asyncHandler(async (req, res) => {
  // destructure product/description from request body
  const { product, description } = req.body;

  //   if product or description not provided by user
  if (!product || !description) {
    res.status(400);
    throw new Error('Please add an product and descripton');
  }

  // get user using the id in the jwt
  const user = await User.findById(req.user.id);

  //   if user not found
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //   create the new ticket
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });

  //   success
  res.status(201).json(ticket);
});

///////////////////////////////////////////////////////////////////////////

// delete  ticket
// @route DELETE /api/tickets/:id
// @access private
const deleteTicket = asyncHandler(async (req, res) => {
  // get user using the id in the jwt
  const user = await User.findById(req.user.id);

  // if user not found
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // find ticket by id
  const ticket = await Ticket.findById(req.params.id);

  // if no ticket found
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // if ticket doesnt belong the the user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  // delete the ticket
  await ticket.remove();

  // success
  res.status(200).json({ success: true });
});

///////////////////////////////////////////////////////////////////////////

// Update user ticket
// @route PUT /api/tickets/:id
// @access private
const updateTicket = asyncHandler(async (req, res) => {
  // get user using the id in the jwt
  const user = await User.findById(req.user.id);

  // if no user found
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // find ticket by ID
  const ticket = await Ticket.findById(req.params.id);

  // if ticket not found
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // if ticket doesnt belong to the found user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  // update the found ticket
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  // success
  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTickets,
  getTicket,
  deleteTicket,
  updateTicket,
};
