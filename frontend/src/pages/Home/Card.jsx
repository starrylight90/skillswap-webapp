import React from 'react';

const Card = ({ user }) => {
  const skillsString = user.skills.join(', ');

  // Check if user has photos
  const hasPhotos = user.photos && user.photos.length > 0;

  // Display the uploaded photo or a random image
  const photoUrl = hasPhotos ? user.photos[0].url : null;
  const avatarImage = require('../images/img_avatar.png');
  // Import all images from the "images" folder
  const imagesContext = require.context('../images', false, /\.(png|jpe?g|svg)$/);
  const images = imagesContext.keys().map(imagesContext);

  // Choose a random image from the imported images if MongoDB URL is not available
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div style={styles.card}>
      <div style={styles.carousel}>
        {(hasPhotos || randomImage) && (
          <img src={hasPhotos ? photoUrl : randomImage} alt={user.name} style={styles.image} />
        )}
        <img src={avatarImage} alt="Avatar" style={styles.image} />
      </div>
      <div style={styles.container}>
        <h4 style={styles.title}><b>{user.name}</b></h4>
        <p><b>Age:</b> {user.age}, <b>Gender:</b> {user.gender}</p>
        <p><b>Skills:</b> <span style={styles.skills}>{skillsString}</span></p>
        <p>{user.description}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    width: '40%',
    margin: 'auto',
    marginTop: '20px',
    overflow: 'hidden', // Ensure the card doesn't expand based on image size
  },
  carousel: {
    display: 'flex',
    overflowX: 'scroll',
  },
  image: {
    flex: '0 0 auto',
    width: '100%',
    height: '400px', // Set a fixed height for all images
    objectFit: 'cover', // Maintain the aspect ratio and cover the entire space
  },
  container: {
    padding: '2px 16px',
  },
  title: {
    margin: '0',
  },
  skills: {
    fontWeight: 'bold',
  },
};

export default Card;
