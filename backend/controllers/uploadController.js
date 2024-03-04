const handleFileUpload = (req, res) => {
    try {
      // req.files contains an array of uploaded files
      const filePaths = req.files.map(file => file.filename);
  
      // Respond with the paths to the uploaded files
      res.status(200).json(filePaths);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export { handleFileUpload };
  