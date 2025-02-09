import { Router } from 'express';
import { handleJourney } from '../controllers/journeyController';

const router = Router();

router.post('/journey', handleJourney);

export default router;
