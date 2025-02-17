import { Group } from '../models/group.model';
import { getCars } from './carService';

// waitingGroups as FIFO.
let waitingGroups: Map<number, Group> = new Map();
let assignedGroups: Map<number, number> = new Map();

export const addGroupToWaitingList = (group: Group) => {
  waitingGroups.set(group.id, group);
};


export const getGroupById = (groupId: number): Group | undefined => {
  return waitingGroups.get(groupId);
};

export const removeGroupFromWaitingList = (groupId: number): boolean => {
  return waitingGroups.delete(groupId);
};


export const assignGroupToCar = (groupId: number, carId: number) => {
  assignedGroups.set(groupId, carId);
};

export const getAssignedCar = (groupId: number): number | undefined => {
  return assignedGroups.get(groupId);
};

export const clearGroups = () => {
  waitingGroups.clear();
  assignedGroups.clear();
};

export const removeGroup = (groupId: number): boolean => {
  if (assignedGroups.has(groupId)) {
    assignedGroups.delete(groupId);
    return true;
  }

  if (waitingGroups.has(groupId)) {
    waitingGroups.delete(groupId);
    return true;
  }

  return false;
};

export const getGroupCar = (groupId: number): { status: number; car?: { id: number; seats: number }, message?: string } => {
  const assignedCarId = assignedGroups.get(groupId);

  if (assignedCarId !== undefined) {
    const cars = getCars();
    const car = cars.find(c => c.id === assignedCarId);

    if (car) {
      return { status: 200, car: { id: car.id, seats: car.seats } };
    }
  }

  if (waitingGroups.has(groupId)) { 
    return { status: 204 };
  }

  return { status: 404, message: 'Group not found' };
};

 // USING FIFO 
export const assignWaitingGroupToCar = () => {
  for (const [groupId, group] of waitingGroups) { 
    for (const car of getCars()) {
      if (car.seats - car.occupiedSeats >= group.people) {
        car.occupiedSeats += group.people;
        assignGroupToCar(group.id, car.id);
        waitingGroups.delete(groupId);
        return { status: 200, message: `Group ${group.id} assigned to car ${car.id} after dropoff` };
      }
    }
  }
  return { status: 200, message: 'No waiting group could be assigned to a car' };
};

