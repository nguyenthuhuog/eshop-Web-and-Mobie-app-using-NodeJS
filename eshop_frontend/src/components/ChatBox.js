import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa'; 
import '../css/chatbox.css'; 

const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-icon" onClick={toggleChat}>
        <FaComments size={30} />
      </div>

      {isChatOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h4>Chat with us</h4>
            <button onClick={toggleChat}>X</button>
          </div>
          <div className="chatbox-body">
            {messages.map((msg, index) => (
              <p key={index} className="chat-message">{msg}</p>
            ))}
          </div>
          <div className="chatbox-footer">
            <input 
              type="text" 
              placeholder="Typing..." 
              value={message} 
              onChange={handleMessageChange} 
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
