// controllers/userController.js
import User from "../models/userModel.js";

const createUser = async (req, res) => {
  try {
    const { name, phoneNumber, email, skills, photos, videos, customSkill } = req.body;

    const newUser = await User.create({
      name,
      phoneNumber,
      email,
      skills,
      photos,
      videos,
      customSkill,
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      phoneNumber: newUser.phoneNumber,
      email: newUser.email,
      skills: newUser.skills,
      photos: newUser.photos,
      videos: newUser.videos,
      customSkill: newUser.customSkill,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid User Data' });
  }
};

const getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
// Add other controller functions (getUsers, getUserById, updateUser) if needed

export { createUser, getUsers };
