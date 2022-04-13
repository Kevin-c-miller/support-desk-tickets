const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

// get notes for a  ticket
// @route GET /api/tickets/:ticketId/notes
// @access private

const getNotes = asyncHandler(async (req, res) => {
  // get user using the id in the jwt
  const user = await User.findById(req.user.id);

  //   if user not found
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //   find tickets for the user
  const ticket = await Ticket.findById(req.params.ticketId);

  //   checking if user matches ticket owner
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  //   find notes for specific ticket
  const notes = await Note.find({ ticket: req.params.ticketId });

  //   success
  res.status(200).json(notes);
});

// create notes for a  ticket
// @route POST /api/tickets/:ticketId/notes
// @access private

const createNote = asyncHandler(async (req, res) => {
  // get user using the id in the jwt
  const user = await User.findById(req.user.id);

  //   if user not found
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //   find tickets for the user
  const ticket = await Ticket.findById(req.params.ticketId);

  //   checking if user matches ticket owner
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  //   find notes for specific ticket
  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });

  //   success
  res.status(200).json(note);
});

module.exports = { getNotes, createNote };
