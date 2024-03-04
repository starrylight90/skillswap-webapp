import express from 'express';
import upload from '../config/multer.js'; // Import the configured Multer instance
import { handleFileUpload } from '../controllers/uploadController.js';

const uploadRouter = express.Router();

// Handle file uploads
uploadRouter.post('/upload', upload.array('files', 3), handleFileUpload);

export default uploadRouter;
