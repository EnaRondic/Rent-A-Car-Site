import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/all-images/background.jpg';
import '../styles/login.css';

const Register = () => {
  const [name, setName] = useState('Ena'); 
  const [surname, setSurname] = useState('Rondic'); 
  const [email, setEmail] = useState('test@gmail.com'); 
  const [password, setPassword] = useState('password123'); 
  const [confirmPassword, setConfirmPassword] = useState('password123'); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Lozinke se ne poklapaju");
      return;
    }

    if (email === "test@gmail.com" && password === "password123") {
      setErrorMessage('');
      navigate('/login');
    } else {
      setErrorMessage('Registracija nije uspjela. Provjerite vaše podatke.');
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay"></div>
      <div className="login-form">
        <h2 className="login-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)} 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Last Name</label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)} 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Password Confirmation</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="form-input"
            />
          </div>

          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}

          <button type="submit" className="submit-button">Register</button>

          <div className="login-link">
            <p>
              Already have an account?{' '}
              <a href="/login">Sign In</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
