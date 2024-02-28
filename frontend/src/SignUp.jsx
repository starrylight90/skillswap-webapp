import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    skills: [],
    customSkill: 'awesome',
    photoFiles: [], // Added for storing base64-encoded image strings
  });

  const skillsOptions = [
    'Skill 1',
    'Skill 2',
    'Skill 3',
    'Skill 4',
    'Skill 5',
    'Skill 6',
    'Skill 7',
    'Skill 8',
    'Skill 9',
    'Skill 10',
  ];

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
      });
    });

    try {
      const base64Strings = await Promise.all(base64Promises);
      setFormData((prevData) => ({
        ...prevData,
        photoFiles: base64Strings, // Store base64-encoded image strings
      }));
    } catch (error) {
      console.error('Error reading image files:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming your server is running on http://localhost:3011
      const response = await axios.post('http://localhost:3011/api/user', {
        ...formData,
        // Convert base64 strings to photos object
        photos: formData.photoFiles.map((base64String) => ({
          data: base64String,
          contentType: 'image/jpeg', // Update with the actual content type if needed
        })),
      });

      alert('User data submitted successfully');
      navigate('/home');
    } catch (error) {
      console.error('Error submitting user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'skills' ? Array.from(e.target.selectedOptions, (option) => option.value) : value,
    }));
  };

  return (
    <div>
      <h1>SignUp Page</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Skills:</label>
        <select
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          multiple
          required
        >
          {skillsOptions.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        <label>Upload Photos:</label>
        <input type="file" name="photoFiles" accept="image/*" multiple onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
