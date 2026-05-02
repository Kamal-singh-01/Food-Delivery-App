import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/foods',foodRoutes);

// start server AFTER DB connects
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.log("Failed to start server:", error);
  }
};

startServer();