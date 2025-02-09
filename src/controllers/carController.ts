import { Request, Response } from 'express';

let cars: { id: number; seats: number }[] = [];

export const loadCars = (req: Request, res: Response): void => {
  try {
    const newCars = req.body;

    if (!Array.isArray(newCars) || newCars.some(car => typeof car.id !== 'number' || typeof car.seats !== 'number')) {
      res.status(400).json({ error: 'Invalid format' });
      return;
    }

    cars = newCars;
    res.status(200).json({ message: 'Car list registered' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
