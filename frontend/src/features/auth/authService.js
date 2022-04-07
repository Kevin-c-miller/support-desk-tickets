import axios from 'axios';

const API_URL = '/api/users';

// Register User
const register = async (userData) => {
  const res = await axios.post(API_URL, userData);

  if (res.data) {
    console.log('successful register');
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

// login user
const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);

  if (res.data) {
    console.log('successful login');
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

// logout user
const logoutUser = () => {
  console.log('removed user');
  localStorage.removeItem('user');
};

// any function in this object will be exported
const authService = {
  register,
  login,
  logoutUser,
};
export default authService;
