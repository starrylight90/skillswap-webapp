// Chat.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLoggedInUser } from '../../components/context'; // Import the context hook

const Chat = () => {
  const { loggedInUser } = useLoggedInUser(); // Destructure loggedInUser from context
  const [chattedUsers, setChattedUsers] = useState([]);

  useEffect(() => {
    const fetchChattedUsers = async () => {
      try {
        if (!loggedInUser || !loggedInUser._id) return;

        const response = await axios.get(`http://localhost:3011/api/getUsersInChat/${loggedInUser._id}`, {
          headers: {
            'Authorization': `Bearer ${loggedInUser.token}`,
          },
        });

        console.log('Fetched chatted users:', response.data); // Log the fetched data
        setChattedUsers(response.data);
      } catch (error) {
        console.error('Error fetching chatted users:', error);
      }
    };

    fetchChattedUsers();
  }, [loggedInUser]);

  return (
    <div className="chat-page">
      <h2>People to Chat With</h2>
      <ul>
        {chattedUsers.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
