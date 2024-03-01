// controllers/userController.js
import User from "../models/userModel.js";

const createUser = async (req, res) => {
  try {
    const { 
      name,
      email,
      password,
      phoneNumber,
      skills,
      photos,
      videos,
      birthdate,
      gender,
      description
    } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      phoneNumber,
      skills,
      photos,
      videos,
      birthdate,
      gender,
      description,
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      skills: newUser.skills,
      photos: newUser.photos,
      videos: newUser.videos,
      birthdate: newUser.birthdate,
      age: newUser.age,
      gender: newUser.gender,
      description: newUser.description,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid User Data' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name photos videos age gender description skills');

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }

   // Check if the provided password matches the stored password (plain text comparison)
   if (user.password !== password) {
    // Password is incorrect
    return res.status(401).json({ error: 'Invalid password' });
  }

    // Login successful
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      skills: user.skills,
      photos: user.photos,
      videos: user.videos,
      birthdate: user.birthdate,
      age: user.age,
      gender: user.gender,
      description: user.description,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add other controller functions (getUserById, updateUser) if needed

export { createUser, getAllUsers, loginUser };
