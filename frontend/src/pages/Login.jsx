import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //   destructing the state fields
  const { name, email, password, confirmPassword } = formData;

  // dispatch from react-redux library
  const dispatch = useDispatch();

  // able to bring in any piece of glabal state using this hook
  const { user, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //   onchange function for the form input fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   submit function for the form
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to get support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </section>
    </>
  );
}
