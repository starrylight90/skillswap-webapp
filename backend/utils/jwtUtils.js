import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const generateToken = (userId, email) => {
    const secretKey = process.env.JWT_SECRET_KEY || 'your-default-secret-key';
    const token = jwt.sign({ userId, email }, secretKey, { expiresIn: '1h' });
    return token;
};

const verifyToken = (token) => {
    try {
      const secretKey = process.env.JWT_SECRET_KEY || 'your-default-secret-key';
      // Make sure to handle the "Bearer " prefix before decoding
      const decodedToken = jwt.verify(token.replace('Bearer ', ''), secretKey);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

export { generateToken, verifyToken };
