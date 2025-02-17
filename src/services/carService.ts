import { Car } from '../models/car.model';

let cars: Map<number, Car> = new Map();

export const registerCars = (newCars: { id: number; seats: number }[]) => {
  cars.clear();
  newCars.forEach(car => cars.set(car.id, { ...car, occupiedSeats: 0 }));
};

export const getCars = (): Car[] => {
  return Array.from(cars.values());
};

export const getCarById = (carId: number): Car | undefined => {
  return cars.get(carId);
};
