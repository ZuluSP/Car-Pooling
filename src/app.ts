import express from 'express';
import dotenv from 'dotenv';
import statusRoutes from './routes/statusRoutes';
import carRoutes from './routes/carRoutes';
import journeyRoutes from './routes/journeyRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(statusRoutes);
app.use(carRoutes);
app.use(journeyRoutes);

export default app;
