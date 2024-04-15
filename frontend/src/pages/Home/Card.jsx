import React from 'react';

const Card = ({ user }) => {

  const hasPhotos = user.photos && user.photos.length > 0;

  // Display the uploaded photos or random images
  const photoUrls = hasPhotos ? user.photos.map(photo => photo.url) : [];
  const avatarImage = require('../images/img_avatar.png');
  const imagesContext = require.context('../images', false, /\.(png|jpe?g|svg)$/);
  const images = imagesContext.keys().map(imagesContext);
  const skillsString = user.skills.join(', ');

  // Common JSX structure for all scenarios
  const commonContent = (
    <div style={styles.container}>
      <h4 style={styles.title}><b>{user.name}</b></h4>
      <p><b>Age:</b> {user.age}, <b>Gender:</b> {user.gender}</p>
      <p><b>Skills:</b> <span style={styles.skills}>{skillsString}</span></p>
      <p>{user.description}</p>
    </div>
  );

  // JSX for different scenarios based on the number of photos
  let cardContent;
  if (photoUrls.length === 1) {
    cardContent = (
      <div style={styles.carousel}>
        <img src={photoUrls[0]} alt={user.name} style={{ ...styles.image, height: '600px' }} />
        <img src={avatarImage} alt="Avatar" style={{ ...styles.image, height: '100px' }} />
        {commonContent}
      </div>
    );
  } else if (photoUrls.length === 0) {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    cardContent = (
      <div style={styles.carousel}>
        <img src={randomImage} alt={user.name} style={{ ...styles.image, height: '600px' }} />
        <img src={avatarImage} alt="Avatar" style={{ ...styles.image, height: '100px' }} />
        {commonContent}
      </div>
    );
  } else if (photoUrls.length === 2) {
    cardContent = (
      <div style={styles.carousel}>
        <img src={photoUrls[0]} alt={user.name} style={{ ...styles.image, height: '600px' }} />
        <img src={photoUrls[1]} alt={user.name} style={{ ...styles.image, height: '600px' }} />
        {commonContent}
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {cardContent}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: '100vh', // Set page height to full viewport height
    overflowY: 'scroll', // Enable vertical scrolling if content overflows
  },
  card: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    width: '40%',
    margin: 'auto',
    marginTop: '20px',
    overflow: 'hidden',
  },
  carousel: {
    display: 'flex',
    overflowX: 'scroll',
  },
  image: {
    flex: '0 0 auto',
    width: '50%', // Adjusted width for better visibility
    objectFit: 'cover',
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

