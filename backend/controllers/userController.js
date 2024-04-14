// controllers/userController.js
import User from "../models/userModel.js";
import { generateToken } from "../utils/jwtUtils.js";

const createUser = async (req, res) => {
  try {
    const { 
      name,
      email,
      password,
      phoneNumber,
      skills,
      linkedin,
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
      linkedin,
      photos,
      videos,
      birthdate,
      gender,
      description,
    });

    // Generate a token for the newly created user
    const token = generateToken(newUser._id, newUser.email);

    // Include the token in the response
    res.status(201).json({
      token,
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      skills: newUser.skills,
      linkedin: newUser.linkedin,
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

const getUserById = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await User.findById(userId, { _id: 1, email: 1, skills: 1 });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUsersInChat = async (req, res) => {
  try {
    const currentUserId = req.params.uid;

    // Find the current user
    const currentUser = await User.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract emails from the chat field
    const emailsInChat = currentUser.chat;

    // Find users with matching emails
    const usersInChat = await User.find({ email: { $in: emailsInChat } }, '_id name linkedin');
    
    // Return names and UIDs of users in chat
    res.status(200).json(usersInChat);
  } catch (error) {
    console.error('Error fetching users in chat:', error);
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
    const token = generateToken(user._id, user.email);
 

    res.status(200).json({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      skills: user.skills,
      linkedin: user.linkedin,
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

const swipeRight = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const swipedUserId = req.params.uid;

    // Find current user and swiped user
    const currentUser = await User.findById(currentUserId);
    const swipedUser = await User.findById(swipedUserId);

    if (!currentUser || !swipedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the current user has swiped right on the swiped user
    if (currentUser.liked.includes(swipedUser.email)) {
      // If already swiped right, update both users' chat fields
      swipedUser.liked.push(currentUser.email);
      currentUser.chat.push(swipedUser.email);
      swipedUser.chat.push(currentUser.email);

      // Save changes to both users
      await currentUser.save();
      await swipedUser.save();

      // Check if chat is initiated between the users
      const chatInitiated = currentUser.chat.includes(swipedUser.email) && swipedUser.chat.includes(currentUser.email);

      res.status(200).json({ message: 'Swiped right successfully, chat initiated', chatInitiated });

    } else {
      // If not swiped right yet, update the swiped user's liked field
      swipedUser.liked.push(currentUser.email);

      // Save changes to the swiped user only
      await swipedUser.save();
      res.status(200).json({ message: 'Swiped right successfully' });
    }

    
  } catch (error) {
    console.error('Error swiping right:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const swipeLeft = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const swipedUserId = req.params.uid;

    // Find current user and swiped user
    const currentUser = await User.findById(currentUserId);
    const swipedUser = await User.findById(swipedUserId);

    if (!currentUser || !swipedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the swiped user's notLiked array with the current user's email
    swipedUser.notLiked.push(currentUser.email);

    // Save changes to the swiped user
    await swipedUser.save();

    res.status(200).json({ message: 'Swiped left successfully' });
  } catch (error) {
    console.error('Error swiping left:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { createUser, getAllUsers, loginUser, getUserById, getUsersInChat, swipeRight, swipeLeft };
