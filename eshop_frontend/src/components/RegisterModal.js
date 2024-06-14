import React, { useState } from 'react';
import axios from 'axios';
import '../css/homepage.css';

const RegisterModal = ({ show, onClose }) => {
  const api = 'http://localhost:8080/api/accounts';
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [registering, setRegistering] = useState(false);

  if (!show) {
    return null;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error message when user types in the input field
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setRegistering(true); // Set registering state to true to disable submit button
      const response = await axios.post(api, formData);
      console.log('User registered successfully:', response.data);
      setSuccessMessage('Registration successful! You can now use your new account to log in.');
      setTimeout(() => {
        setSuccessMessage('');
        setRegistering(false); // Reset registering state to enable submit button
        setFormData({ username: '', password: '', email: '' }); // Reset form data
        onClose(); // Close the registration modal after timeout
      }, 10000); // Auto close modal after 10 seconds
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Username already exists. Please choose a different username.');
      } else {
        setError('Error registering user. Please try again later.');
        console.error('Error registering user:', error);
      }
      setRegistering(false); // Reset registering state to enable submit button
    }
  };

  return (
    <div className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" disabled={registering}>
            {registering ? 'Registering...' : 'Register'}
          </button>
        </form>
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterModal;
