"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerJourney = void 0;
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
