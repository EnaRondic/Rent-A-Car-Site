import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/all-images/background.jpg';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('admin@example.com'); 
  const [password, setPassword] = useState('admin'); 
  const [showPassword, setShowPassword] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "admin") {
      setErrorMessage('');
      navigate('/home');
    } else {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay"></div>
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              readOnly // Prevent user from changing the email
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"} 
                id="password"
                value={password}
                readOnly // Prevent user from changing the password
                className="form-input"
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)} 
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'} 
              </span>
            </div>
          </div>

          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}

          <button type="submit" className="submit-buttonn">Log in</button>

          <div className="register-link">
            <p>
              Don't have an account?{' '}
              <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
