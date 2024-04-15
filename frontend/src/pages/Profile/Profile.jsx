import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useDropzone} from 'react-dropzone';

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
      alert('Data sent successfully, Account created Successfully!');
  
      // Navigate to /home after setting the logged-in user
      navigate('/login');
      // You can handle further actions here, such as redirecting the user
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  const onDrop = async (acceptedFiles) => {
    try {
      const formData = new FormData();

      const uniqueIdentifier = `${formData.name}_${new Date().toLocaleDateString()}`;

      acceptedFiles.forEach((file) => {
        const fileName = `${uniqueIdentifier}_${file.name}`;
        formData.append('files', file, fileName);
      });

      const response = await axios.post('http://localhost:3011/api/upload', formData);

      // Separate images and videos based on file type
      const imagePaths = response.data.filter((path) => path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png'));
      const videoPaths = response.data.filter((path) => path.endsWith('.mp4'));

      // Prepend base URL to image paths
      const baseUrl = 'http://localhost:3011/uploads/';
      const formattedImagePaths = imagePaths.map((path) => baseUrl + path);

      // Update formData without overwriting existing data
      setFormData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, ...formattedImagePaths.map((url) => ({ url }))],
        videos: [...prevData.videos, ...videoPaths.map((url) => ({ url, duration: 0 }))], // Set default duration for videos
      }));
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Hardcoded data for demonstration
  const hardcodedData = {
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

        <label>Linkedin:</label>
        <input
          type="text"
          value={formData.linkedin}
          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
        />
        <br />

        <label>Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <br />

                {/* Display photos and videos */}
                <label>Photos:</label>
        <div {...getRootProps()} style={dropzoneStyle}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        {formData.photos &&
          formData.photos.map((photo, index) => (
            <div key={index}>
              {photo ? <img src={photo.url} alt={`Uploaded ${index + 1}`} style={imageStyle} /> : null}
            </div>
          ))}
        <br />

        <label>Videos:</label>
        {formData.videos &&
          formData.videos.map((video, index) => (
            <div key={index}>
              {video ? (
                <div>
                  {video.url}, Duration: {video.duration} seconds
                </div>
              ) : null}
            </div>
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

const dropzoneStyle = {
  width: '100%',
  height: '100px',
  border: '2px dashed #ddd',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const imageStyle = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  marginRight: '10px',
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
