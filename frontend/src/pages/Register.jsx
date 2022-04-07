import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //   destructing the state fields
  const { name, email, password, confirmPassword } = formData;

  // dispatch from react-redux library
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // able to bring in any piece of glabal state using this hook
  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // if error
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset);
  }, [dispatch, isError, isSuccess, message, navigate, user]);

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

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
              placeholder="Enter your name"
            />
          </div>
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
            <input
              type="text"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
              placeholder="Confirm password"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Register</button>
          </div>
        </form>
      </section>
    </>
  );
}
