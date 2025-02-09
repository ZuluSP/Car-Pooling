import { Router } from 'express';
import { loadCars } from '../controllers/carController';

const router = Router();

router.put('/cars', loadCars);

export default router;
