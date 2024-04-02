import React, { useState } from 'react';
import Message from './Message'; // Assuming you have a Message component for displaying individual messages
import './Chat.css'; // Importing the CSS file


const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const peopleToChatWith = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Brown' },
    // Add more people as needed
  ];

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        sender: user,
        content: inputMessage,
        timestamp: new Date().toISOString(),
      };

      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  const handleUserSelect = (selectedUserId) => {
    setSelectedUser(selectedUserId);
    // You may want to fetch previous messages with this user here
  };

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        <h2>People to Chat With</h2>
        <ul>
          {peopleToChatWith.map((person) => (
            <li key={person.id} onClick={() => handleUserSelect(person.id)} className={selectedUser === person.id ? 'active' : ''}>
              {person.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-container">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <h2>Chat with {peopleToChatWith.find(person => person.id === selectedUser).name}</h2>
            </div>
            <div className="chat-messages">
              {messages.map((message) => (
                <Message key={message.id} message={message} currentUser={user} />
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
