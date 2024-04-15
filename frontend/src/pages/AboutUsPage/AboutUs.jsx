import React from 'react';
import './AboutUs.css'; // Import CSS for styling
import image from "../images/b1.jpg";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="image-container">
        <img src={image} alt="Team" />
        <h1>About Us</h1>
      </div>
      <div className="content-container">
      <div className="text-container">
  <p>SkillSwap is a platform designed to connect individuals with various skills and expertise, fostering collaboration and knowledge exchange within a diverse community.</p>
  <p>Our mission is to empower individuals to share their skills, learn from others, and collaborate on projects that inspire innovation and creativity.</p>
  <p>Whether you're a developer, designer, marketer, or entrepreneur, SkillSwap provides a space for you to showcase your talents,</p>
    <p>find opportunities for growth, and connect with like-minded individuals who share your passion for learning and collaboration.</p>
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

export default AboutUs;


