import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import taskRoutes from './routes/task.route.js';
import boardRoutes from './routes/board.route.js  ';
import dotenv from 'dotenv';

dotenv.config();

const app = express();



// Middleware
app.use(cors());
app.use(express.json()); 

// API Routes
app.use('/api',taskRoutes);
app.use('/api', boardRoutes);

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});