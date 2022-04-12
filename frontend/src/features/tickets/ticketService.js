import axios from 'axios';
const API_URL = '/api/tickets/';

// create new ticket
const createNewTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, ticketData, config);

  return res.data;
};

// get user tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL, config);

  return res.data;
};

// get user ticket
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + ticketId, config);

  return res.data;
};

const ticketService = { createNewTicket, getTickets, getTicket };
export default ticketService;
