// index.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';  // Import fileURLToPath
import userRouter from './routes/userRoutes.js';
import connectDB from './config/db.js';

const __filename = fileURLToPath(import.meta.url);  // Use fileURLToPath to convert the module URL to file path
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve images statically
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api', userRouter);

app.get("/", (req, res) => {
    res.send("API running");
});

const PORT = 3011;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
