import React, { useState } from 'react';
import axios from 'axios';
import '../css/homepage.css';

const LoginModal = ({ show, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!show) {
    return null;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8080/login', {email, password});
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div id="loginModal" className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" onChange={(e)=> setEmail(e.target.value)}/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e)=> setPassword(e.target.value)}/>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
