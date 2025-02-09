import { Car } from '../models/car.model';
import { Group } from '../models/group.model';
import { getCars } from './carService';
import { addGroupToWaitingList, assignGroupToCar } from './groupService';

export const registerJourney = (group: Group): { status: number; message: string } => {
  if (!group || typeof group.id !== 'number' || typeof group.people !== 'number') {
    return { status: 400, message: 'Invalid format' };
  }

  const cars = getCars();

  for (const car of cars) {
    if (car.seats - car.occupiedSeats >= group.people) {
      car.occupiedSeats += group.people;
      assignGroupToCar(group.id, car.id);
      return { status: 200, message: `Group assigned to car ${car.id}` };
    }
  }

  addGroupToWaitingList(group);
  return { status: 202, message: 'No car available with enough seats, group added to waiting list' };
};
