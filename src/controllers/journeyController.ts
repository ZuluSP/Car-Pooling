import { Request, Response } from 'express';
import { registerJourney } from '../services/journeyService';

export const handleJourney = (req: Request, res: Response): void => {
  const { status, message } = registerJourney(req.body);

  res.status(status).json({ message });
};
