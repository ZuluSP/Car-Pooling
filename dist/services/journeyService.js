"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropoffGroup = exports.registerJourney = void 0;
const carService_1 = require("./carService");
const groupService_1 = require("./groupService");
const registerJourney = (group) => {
    if (!group || typeof group.id !== 'number' || typeof group.people !== 'number') {
        return { status: 400, message: 'Invalid format' };
    }
    const cars = (0, carService_1.getCars)();
    for (const car of cars) {
        if (car.seats - car.occupiedSeats >= group.people) {
            car.occupiedSeats += group.people;
            (0, groupService_1.assignGroupToCar)(group.id, car.id);
            return { status: 200, message: `Group assigned to car ${car.id}` };
        }
    }
    (0, groupService_1.addGroupToWaitingList)(group);
    return { status: 202, message: 'No car available with enough seats, group added to waiting list' };
};
exports.registerJourney = registerJourney;
const dropoffGroup = (groupId) => {
    const carId = (0, groupService_1.getAssignedCar)(groupId);
    if (carId !== undefined) {
        const cars = (0, carService_1.getCars)();
        const car = cars.find(c => c.id === carId);
        if (car) {
            car.occupiedSeats -= car.occupiedSeats; // Libera los asientos del coche
        }
        (0, groupService_1.removeGroup)(groupId);
        return { status: 200, message: `Group ${groupId} removed from car ${carId} and seats freed` };
    }
    // This condition is if the group wasnt assigned to a car, but it was waiting
    // We could manage the case of a group that never got a car and decides to cancel.
    const wasRemoved = (0, groupService_1.removeGroup)(groupId);
    if (wasRemoved) {
        return { status: 200, message: `Group ${groupId} removed from waiting list` };
    }
    return { status: 404, message: `Group ${groupId} not found` };
};
exports.dropoffGroup = dropoffGroup;
