import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLoggedInUser } from '../../components/context'; // Import the context hook
import withAuthRedirect from '../../components/withAuthRedirect';

const Match = () => {
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
    <div className="match-page">
      <h2>People to Chat With</h2>
      <ul>
        {chattedUsers.map((user) => (
          <li key={user._id}>
            {user.name}
            {user.linkedin && (
              <span>
                &nbsp;|&nbsp;
                <a href={user.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withAuthRedirect(Match);
