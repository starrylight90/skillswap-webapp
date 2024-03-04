import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Card from './Card';

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  const loggedInUser = location.state?.loggedInUser;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Check if loggedInUser is defined and has the expected properties
        if (loggedInUser && loggedInUser._id) {
          const response = await axios.get('http://localhost:3011/api/getAllUsers', {
            headers: {
              'Authorization': `Bearer ${loggedInUser.token}`,
            },
          });
          // Filter out the logged-in user from the list
          const filteredUsers = response.data.filter(user => user._id !== loggedInUser._id);
          setUsers(filteredUsers);
        } else {
          console.error('Invalid or undefined loggedInUser');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [loggedInUser]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length);
  };

  const handleHeartClick = () => {
    console.log("Heart clicked");
  };

  return (
    <div>
      {users.length > 0 && (
        <Card key={users[currentIndex]._id} user={users[currentIndex]} />
      )}
      <div style={styles.buttonContainer}>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleHeartClick}>❤️</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
};
