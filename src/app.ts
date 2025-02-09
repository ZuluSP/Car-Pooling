import express from 'express';
import dotenv from 'dotenv';
import statusRoutes from './routes/statusRoutes';
import carRoutes from './routes/carRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(statusRoutes);
app.use(carRoutes);

export default app;
