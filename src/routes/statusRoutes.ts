import { Router } from 'express';

const router = Router();

router.get('/status', (req, res) => {
  res.status(200).send('Service is running');
});

export default router;
