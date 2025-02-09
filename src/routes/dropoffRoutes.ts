import { Router } from 'express';
import { handleDropoff } from '../controllers/dropoffController';

const router = Router();

router.post('/dropoff', handleDropoff);

export default router;
