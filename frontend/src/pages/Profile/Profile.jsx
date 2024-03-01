import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Page1 = ({ onNext, formData, setFormData }) => {
  const handleNext = () => {
    onNext();
  };

  return (
    <div>
      <h2>Page 1</h2>
      <form>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <br />

        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <br />

        <label>Phone Number:</label>
        <input
          type="text"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
        />
        <br />

        <button type="button" onClick={handleNext}>
          Next
        </button>
      </form>
    </div>
  );
  
};

const Page2 = ({ onPrevious, formData, setFormData }) => {
  const navigate = useNavigate();
  const handlePrevious = () => {
    onPrevious();
  };

  const handleSubmit = async () => {
    // Validate the gender field before submitting
    if (!formData.gender) {
      console.error('Gender is required');
      return;
    }

    // Send the data to the backend
    try {
      const response = await axios.post('http://localhost:3011/api/user', formData);
      console.log('Data submitted successfully:', response.data);
      alert('Data sent successfully');
      navigate('/home');
      // You can handle further actions here, such as redirecting the user
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  // Hardcoded data for demonstration
  const hardcodedData = {
    photos: [
      { "url": "https://example.com/bob_photo1.jpg" },
      { "url": "https://example.com/bob_photo2.jpg" }
    ],
    videos: [
      { "url": "https://example.com/bob_video1.mp4", "duration": 15 },
      { "url": "https://example.com/bob_video2.mp4", "duration": 19 }
    ],
    skills: [
      "Programming",
      "Data Analysis",
      "Web Development",
      "Graphic Design",
      "Marketing",
      "Communication",
      "UI/UX Design",
      "Project Management",
      "Machine Learning",
      "Database Management"
    ]
  };

  return (
    <div>
      <h2>Page 2</h2>
      <form>
        <label>Gender:</label>
        <select
        value={formData.gender}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
        <br />

        <label>Birthdate:</label>
        <input
          type="date"
          value={formData.birthdate}
          onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
        />
        <br />

        <label>Skills:</label>
        <select
          multiple
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: Array.from(e.target.selectedOptions, option => option.value) })}
        >
          {hardcodedData.skills.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
        <br />

        <label>Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <br />

        {/* Display photos and videos (as hardcoded data) */}
        <label>Photos:</label>
        {hardcodedData.photos.map((photo, index) => (
          <div key={index}>{photo.url}</div>
        ))}
        <br />

        <label>Videos:</label>
        {hardcodedData.videos.map((video, index) => (
          <div key={index}>{video.url}, Duration: {video.duration} seconds</div>
        ))}
        <br />

        <button type="button" onClick={handlePrevious}>
          Previous
        </button>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    // Add more fields for Page 2 data
    gender: 'Male',
    birthdate: '',
    skills: [],
    description: '',
    // Example: photos, videos
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {currentPage === 1 && (
        <Page1 onNext={handleNext} formData={formData} setFormData={setFormData} />
      )}
      {currentPage === 2 && (
        <Page2 onPrevious={handlePrevious} formData={formData} setFormData={setFormData} />
      )}
    </div>
  );
};

export default Profile;
