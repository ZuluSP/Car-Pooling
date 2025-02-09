"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGroup = exports.clearGroups = exports.getAssignedCar = exports.assignGroupToCar = exports.addGroupToWaitingList = void 0;
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
const removeGroup = (groupId) => {
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
exports.removeGroup = removeGroup;
