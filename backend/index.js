// index.js
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import userRouter from './routes/userRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import connectDB from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', userRouter);
app.use('/api', uploadRouter); // Mount the upload router

app.get("/", (req, res) => {
    res.send("API running");
});

const PORT = 3011;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
