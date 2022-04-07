import axios from 'axios';

const API_URL = '/api/users';

// Register User
const register = async (userData) => {
  const res = await axios.post(API_URL, userData);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

// logout user
const logout = () => {
  localStorage.removeItem('user');
};

// any function in thisobject will be exported
const authService = {
  register,
  logout,
};
export default authService;
