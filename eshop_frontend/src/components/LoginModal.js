// src/LoginModal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../css/homepage.css';

const LoginModal = ({ show, onClose, responseText, setresponseText }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // if not logged in the reset response
  useEffect(() => {
    if(!Cookies.get('userID')) setresponseText("Please log in to continue");
  }, [username]);
  
  if (!show) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/accounts/login', { username, password }, { withCredentials: true });
      console.log('Response data from user logged in:', response.data);

      const expireTime = new Date(new Date().getTime() + 15 * 60 * 1000); // 15'
      Cookies.set('userID', response.data.userID, { expires: expireTime }); // Set cookie with userID, expires in 1 day
      Cookies.set('isAdmin', response.data.isAdmin, { expires : expireTime});
      console.log(Cookies.get());
      setUsername(''); 
      setPassword(''); 
      if (response.data.isAdmin === 1) {
        setresponseText('Welcom Admin, happy working');
        navigate('/admincomputer'); // Redirect to admin homepage if user is an admin
      } else {
        setresponseText('You have logged in, happy shopping');
      }
    } catch (error) {
      if (error.response.status === 401) {
        setresponseText('Username or password are wrong, please try again');
      }
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
          <h3>{responseText}</h3>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;