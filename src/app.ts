import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('Failed to connect to MongoDB', err));

app.get('/', (req: Request, res: Response) => {
  res.send('D&D Campaign Manager Server is up and running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;