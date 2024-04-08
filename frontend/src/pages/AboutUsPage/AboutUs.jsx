import React from 'react';
import './AboutUs.css'

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <section className="intro-section">
                <h1>Welcome to SkillSwap</h1>
                <p>Where skills meet opportunities</p>
            </section>

            <section className="mission-section">
                <h2>Our Mission</h2>
                <p>At SkillSwap, our mission is to connect people with diverse skills and knowledge, fostering a vibrant community where individuals can learn, grow, and collaborate.</p>
            </section>

            <section className="story-section">
                <h2>Our Story</h2>
                <p>Founded in [year], SkillSwap was born out of a desire to create a platform that enables individuals to share their expertise and learn from others in a supportive environment.</p>
                <p>Since then, we've grown into a thriving community of [number] members, exchanging knowledge and skills across a wide range of disciplines.</p>
            </section>

            <section className="team-section">
                <h2>Our Team</h2>
                <div className="team-members">
                    <div className="team-member">
                        <img src="team-member-1.jpg" alt="Team Member 1" />
                        <h3>John Doe</h3>
                        <p>Co-Founder & CEO</p>
                    </div>
                    <div className="team-member">
                        <img src="team-member-2.jpg" alt="Team Member 2" />
                        <h3>Jane Smith</h3>
                        <p>Co-Founder & CTO</p>
                    </div>
                    {/* Add more team members as needed */}
                </div>
            </section>

            <section className="why-us-section">
                <h2>Why SkillSwap?</h2>
                <p>At SkillSwap, we're committed to providing a seamless and rewarding experience for our users. Here's why you should join us:</p>
                <ul>
                    <li>Access to a diverse community of experts</li>
                    <li>Flexible learning opportunities</li>
                    <li>Networking and collaboration possibilities</li>
                </ul>
            </section>

            <section className="join-us-section">
                <h2>Join Us</h2>
                <p>Ready to start swapping skills? Sign up now and become a part of our growing community!</p>
                <button>Sign Up</button>
            </section>

            <section className="contact-us-section">
                <h2>Contact Us</h2>
                <p>Have questions or feedback? Reach out to us at <a href="mailto:info@skillswap.com">info@skillswap.com</a>.</p>
            </section>
        </div>
    );
};

export default AboutUs;
