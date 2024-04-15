import React from 'react';
import { useLoggedInUser } from '../../components/context'; // Import the context hook
import "./userProfile.css";


const UserProfile = () => {
  const { loggedInUser } = useLoggedInUser(); // Destructure loggedInUser from context

  // Function to render each key-value pair, excluding 'token' and '_id'
  const renderUserDetails = () => {
    if (!loggedInUser) return null; // If loggedInUser is not available, return null

    // Array of fields to exclude
    const excludeFields = ['token', '_id'];

    return (
      <div className="user-card">
        <div className="user-details-container">
          <div className="user-photo-container">
            {loggedInUser.photos.map((photo) => (
              <img
                key={photo._id}
                src={photo.url}
                alt="User Photo"
                className="user-photo"
              />
            ))}
          </div>
          <div className="user-info-container">
            {Object.keys(loggedInUser).map((key) => {
              // Check if the current key is not in the excludeFields array and the value is not an object
              if (!excludeFields.includes(key) && typeof loggedInUser[key] !== 'object') {
                // If the key is 'linkedin', render it as a clickable link
                if (key === 'linkedin') {
                  return (
                    <div key={key} className="user-info-item">
                      <strong>{key}:</strong> <a href={loggedInUser[key]} target="_blank" rel="noopener noreferrer">{loggedInUser[key]}</a>
                    </div>
                  );
                }
                // Otherwise, render the key-value pair
                return (
                  <div key={key} className="user-info-item">
                    <strong>{key}:</strong> {loggedInUser[key]}
                  </div>
                );
              }
              return null; // Exclude the field from rendering
            })}
          </div>
        </div>
        <div className="animation-container">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderUserDetails()}
    </div>
  );
};

export default UserProfile;
