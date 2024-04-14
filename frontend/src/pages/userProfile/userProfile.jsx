import React from 'react';
import { useLoggedInUser } from '../../components/context'; // Import the context hook

const UserProfile = () => {
  const { loggedInUser } = useLoggedInUser(); // Destructure loggedInUser from context

  // Function to render each key-value pair, excluding 'token' and '_id'
  const renderUserDetails = () => {
    if (!loggedInUser) return null; // If loggedInUser is not available, return null

    // Array of fields to exclude
    const excludeFields = ['token', '_id'];

    return Object.keys(loggedInUser).map((key) => {
      // Check if the current key is not in the excludeFields array and the value is not an object
      if (!excludeFields.includes(key) && typeof loggedInUser[key] !== 'object') {
        // If the key is 'linkedin', render it as a clickable link
        if (key === 'linkedin') {
          return (
            <div key={key}>
              <strong>{key}:</strong> <a href={loggedInUser[key]} target="_blank" rel="noopener noreferrer">{loggedInUser[key]}</a>
            </div>
          );
        }
        // Otherwise, render the key-value pair
        return (
          <div key={key}>
            <strong>{key}:</strong> {loggedInUser[key]}
          </div>
        );
      } else if (key === 'photos') {
        // Render photos if key is 'photos'
        return (
          <div key={key}>
            <strong>{key}:</strong>
            {loggedInUser[key].map((photo) => (
              <img
                key={photo._id}
                src={photo.url}
                alt="User Photo"
                style={{ width: '100px', height: '100px', margin: '5px' }}
              />
            ))}
          </div>
        );
      }
      return null; // Exclude the field from rendering
    });
  };

  return (
    <div>
      <h2>User Profile</h2>
      {renderUserDetails()}
    </div>
  );
};

export default UserProfile;
