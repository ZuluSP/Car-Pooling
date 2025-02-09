import { Group } from '../models/group.model';


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
