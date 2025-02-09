import { Request, Response } from 'express';
import { getGroupCar } from '../services/groupService';

export const handleLocate = (req: Request, res: Response): void => {
  const groupId = Number(req.body.ID);

  if (!groupId || isNaN(groupId)) {
    res.status(400).json({ error: 'Invalid group ID' });
    return;
  }

  const { status, car, message } = getGroupCar(groupId);

  switch(status) {
    case 200: 
    res.status(200).json(car);
    break;
    case 204: 
    res.status(204).end();
    break;
    default: 
    res.status(status).json({ error: message });
  }

};
