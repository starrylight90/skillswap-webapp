// config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/skillswap', {
      // Remove the useNewUrlParser and useUnifiedTopology options
      // as they are no longer needed
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
