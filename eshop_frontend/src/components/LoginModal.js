// src/LoginModal.js
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../css/homepage.css';

const LoginModal = ({ show, onClose, setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/accounts/login', { username, password }, { withCredentials: true });
      console.log('Response data from user logged in:', response.data);
      setIsLoggedIn(true);
      Cookies.set('userID', response.data.userID, { expires: 1 }); // Set cookie with userID, expires in 1 day
      onClose();
      if (response.data.isAdmin) {
        navigate('/admincomputer'); // Redirect to admin homepage if user is an admin
      } else {
        navigate('/homepage'); // Redirect to user homepage otherwise
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
