import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3011/api/getAllUsers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

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