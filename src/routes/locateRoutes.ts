import { Router } from 'express';
import { handleLocate } from '../controllers/locateController';

const router = Router();

router.post('/locate', handleLocate);

export default router;
