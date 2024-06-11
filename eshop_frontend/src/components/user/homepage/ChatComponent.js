import React, { useState } from 'react';
import axios from 'axios';
import '../../../css/homepage.css';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/chat', { message });
      setResponse(res.data.reply);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button className="btn-apibutton" type="submit">Send</button>
      </form>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatComponent;