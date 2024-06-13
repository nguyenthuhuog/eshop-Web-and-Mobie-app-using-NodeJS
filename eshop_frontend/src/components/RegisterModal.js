import React from 'react';
import '../css/homepage.css';

const RegisterModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form>
          <div className="form-group">
            <label htmlFor="new-username">Username</label>
            <input type="text" id="new-username" name="new-username" required />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">Password</label>
            <input type="password" id="new-password" name="new-password" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
