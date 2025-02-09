import { Car } from '../models/car.model';

let cars: Car[] = [];

export const registerCars = (newCars: { id: number; seats: number }[]) => {
  cars = newCars.map(car => ({ ...car, occupiedSeats: 0 }));
};

export const getCars = (): Car[] => {
  return cars;
};
