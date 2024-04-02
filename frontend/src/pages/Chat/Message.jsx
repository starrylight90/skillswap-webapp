import React from 'react';

const Message = ({ message, currentUser }) => {
  const isCurrentUser = message.sender === currentUser;
  
  return (
    <div className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
      <p>{message.content}</p>
      <span>{message.timestamp}</span>
    </div>
  );
};

export default Message;
