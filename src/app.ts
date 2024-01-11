import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes';
import usersRouter from './routes/user.routes'; 
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { initializePassportMiddleware } from './auth/passport';
dotenv.config();


const swaggerDocument = YAML.load('./specification.yaml');


const app = express();
const port = process.env.PORT || 5000;
app.use(initializePassportMiddleware);
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('Failed to connect to MongoDB', err));
  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('D&D Campaign Manager Server is up and running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
