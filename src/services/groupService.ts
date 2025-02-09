import { Group } from '../models/group.model';
import { getCars } from './carService';


let waitingGroups: Group[] = [];
let assignedGroups: Map<number, number> = new Map();

export const addGroupToWaitingList = (group: Group) => {
  waitingGroups.push(group);
};

export const assignGroupToCar = (groupId: number, carId: number) => {
  assignedGroups.set(groupId, carId);
};

export const getAssignedCar = (groupId: number): number | undefined => {
  return assignedGroups.get(groupId);
};

export const clearGroups = () => {
  waitingGroups = [];
  assignedGroups.clear();
};

export const removeGroup = (groupId: number): boolean => {
  if (assignedGroups.has(groupId)) {
    assignedGroups.delete(groupId);
    return true;
  }

  const index = waitingGroups.findIndex(group => group.id === groupId);
  if (index !== -1) {
    waitingGroups.splice(index, 1);
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

  const isWaiting = waitingGroups.some(group => group.id === groupId);
  if (isWaiting) { 
    return { status: 204 };
  }

  return { status: 404, message: 'Group not found' };
};
