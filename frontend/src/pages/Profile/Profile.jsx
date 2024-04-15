import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './Profile.css';
import graphicImage from '../images/graphic1.jpg';
import graphicImage2 from '../images/graphic2.jpg';

const Page1 = ({ onNext, formData, setFormData }) => {
  const handleNext = () => {
    onNext();
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">SignUp With Us !</h2>
        <div className="card-body">
          <div className="card-image">
            <img src={graphicImage} alt="Graphic" />
          </div>
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                className="form-control"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
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
      alert('Data sent successfully, Account created Successfully!');

      // Navigate to /home after setting the logged-in user
      navigate('/login');
      // You can handle further actions here, such as redirecting the user
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const onDrop = async (acceptedFiles) => {
    // Handle file upload logic
  };

  // Hardcoded data for demonstration
  const hardcodedData = {
    skills: [
      'Programming',
      'Data Analysis',
      'Web Development',
      'Graphic Design',
      'Marketing',
      'Communication',
      'UI/UX Design',
      'Project Management',
      'Machine Learning',
      'Database Management',
    ],
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">Tell Us More About You</h2>
        <div className="card-body">
          <div className="card-image">
            <img src={graphicImage2} alt="Graphic" />
          </div>
          <form>
            <div className="form-group">
              <label>Gender:</label>
              <select
                className="form-control"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Birthdate:</label>
              <input
                type="date"
                className="form-control"
                value={formData.birthdate}
                onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Skills:</label>
              <select
                multiple
                className="form-control"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: Array.from(e.target.selectedOptions, (option) => option.value) })
                }
              >
                {hardcodedData.skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Linkedin:</label>
              <input
                type="text"
                className="form-control"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                className="form-control"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={handlePrevious}>
                Previous
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    gender: 'Male',
    birthdate: '',
    skills: [],
    linkedin: '',
    description: '',
    photos: [],
    videos: [],
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