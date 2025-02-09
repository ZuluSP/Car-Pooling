import express from 'express';
import dotenv from 'dotenv';
import statusRoutes from './routes/statusRoutes';
import carRoutes from './routes/carRoutes';
import journeyRoutes from './routes/journeyRoutes';
import dropoffRoutes from './routes/dropoffRoutes';
import locateRoutes from './routes/locateRoutes';



dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // This lets me read x-www-form-urlencoded
app.use(statusRoutes);
app.use(carRoutes);
app.use(journeyRoutes);
app.use(dropoffRoutes);
app.use(locateRoutes);

export default app;
