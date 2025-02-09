"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearGroups = exports.getAssignedCar = exports.assignGroupToCar = exports.addGroupToWaitingList = void 0;
let waitingGroups = [];
let assignedGroups = new Map();
const addGroupToWaitingList = (group) => {
    waitingGroups.push(group);
};
exports.addGroupToWaitingList = addGroupToWaitingList;
const assignGroupToCar = (groupId, carId) => {
    assignedGroups.set(groupId, carId);
};
exports.assignGroupToCar = assignGroupToCar;
const getAssignedCar = (groupId) => {
    return assignedGroups.get(groupId);
};
exports.getAssignedCar = getAssignedCar;
const clearGroups = () => {
    waitingGroups = [];
    assignedGroups.clear();
};
exports.clearGroups = clearGroups;
