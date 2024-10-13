import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/all-images/background.jpg'; 
import '../styles/login.css'; 

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Lozinke se ne poklapaju");
      return;
    }

    try {
      const response = await axios(  {
        method: "POST",
        url: `http://tim4.cortexakademija.com/api/register`,
        headers: {},
        data: {
               "name": name,
               "email": email,
               "password": password,
               "password_confirmation": confirmPassword,
         },
    });

      if (response.status === 201) {
        setErrorMessage('');
        navigate('/login'); 
      }
    } catch (error) {
      setErrorMessage(`Registration failed. ${error.errors}`);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay"></div>
      <div className="login-form">
        <h2 className="login-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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
              required
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
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Password confirmation</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
              <a href="/login">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
