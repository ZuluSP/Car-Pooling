"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCars = exports.registerCars = void 0;
let cars = [];
const registerCars = (newCars) => {
    cars = newCars.map(car => (Object.assign(Object.assign({}, car), { occupiedSeats: 0 })));
};
exports.registerCars = registerCars;
const getCars = () => {
    return cars;
};
exports.getCars = getCars;
