import React, { useState } from 'react';
import axios from 'axios';
import '../css/homepage.css';

const LoginModal = ({ show, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!show) {
    return null;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/accounts/login', { username, password }, { withCredentials: true });
      console.log('User logged in:', response.data);
    } catch (error) {
      console.error('Login error:', error);
      }
    }
  return (
    <div id="loginModal" className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" onChange={(e)=> setUsername(e.target.value)}/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e)=> setPassword(e.target.value)}/>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
