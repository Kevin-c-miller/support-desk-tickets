import axios from 'axios';

const API_URL = '/api/tickets/';

// get ticket notes
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + ticketId + '/notes', config);

  return res.data;
};

const notesService = {
  getNotes,
};

export default notesService;
