const handleFileUpload = (req, res) => {
  try {
    // req.files contains an array of uploaded files
    const filePaths = req.files.map((file) => file.filename);

    // Determine if the uploaded files are images or videos
    const isImage = req.files.every((file) => file.mimetype.startsWith('image'));
    const isVideo = req.files.every((file) => file.mimetype.startsWith('video'));

    if (isImage) {
      // Respond with the paths to the uploaded image files
      res.status(200).json(filePaths);
    } else if (isVideo) {
      // Respond with the paths to the uploaded video files
      res.status(200).json(filePaths);
    } else {
      // Invalid file types
      res.status(400).json({ error: 'Invalid file types. Only images or videos are allowed.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export { handleFileUpload };
