import { Request, Response } from 'express';
import { dropoffGroup } from '../services/journeyService';

export const handleDropoff = (req: Request, res: Response): void => {
  const groupId = Number(req.body.ID);

  if (!groupId || isNaN(groupId)) {
    res.status(400).json({ error: 'Invalid group ID' });
    return;
  }

  const { status, message } = dropoffGroup(groupId);

  res.status(status).json({ message });
};
