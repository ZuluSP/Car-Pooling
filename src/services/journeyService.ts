import { Group } from '../models/group.model';
import { getCars } from './carService';
import { addGroupToWaitingList, assignGroupToCar, getAssignedCar, removeGroup } from './groupService';

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

export const dropoffGroup = (groupId: number): { status: number; message: string } => {
  const carId = getAssignedCar(groupId);

  if (carId !== undefined) {
    const cars = getCars();
    const car = cars.find(c => c.id === carId);

    if (car) {
      car.occupiedSeats -= car.occupiedSeats; // Libera los asientos del coche
    }

    removeGroup(groupId);
    return { status: 200, message: `Group ${groupId} removed from car ${carId} and seats freed` };
  }

  // This condition is if the group wasnt assigned to a car, but it was waiting
  // We could manage the case of a group that never got a car and decides to cancel.
  const wasRemoved = removeGroup(groupId);
  if (wasRemoved) {
    return { status: 200, message: `Group ${groupId} removed from waiting list` };
  }

  return { status: 404, message: `Group ${groupId} not found` };
};