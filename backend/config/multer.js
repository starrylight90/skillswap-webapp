// multer.js
import multer from 'multer';
import path from 'path';

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileExtension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
  },
});

// Filter function to allow only jpg, png, and mp4 files
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.mp4'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only jpg, png, and mp4 are allowed.'), false); // Reject the file
  }
};

// Create Multer instance with configured storage and filter
const upload = multer({ storage, fileFilter });

export default upload;
