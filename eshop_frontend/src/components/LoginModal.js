import React from 'react';
import '../css/homepage.css';

const LoginModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div id="loginModal" className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
