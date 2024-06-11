import React from 'react';
import '../css/homepage.css';

const RegisterModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div id="registerModal" className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form>
          <label htmlFor="new-username">Username</label>
          <input type="text" id="new-username" name="new-username" />
          <label htmlFor="new-password">Password</label>
          <input type="password" id="new-password" name="new-password" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
