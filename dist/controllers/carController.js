"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCars = void 0;
let cars = [];
const loadCars = (req, res) => {
    try {
        const newCars = req.body;
        if (!Array.isArray(newCars) || newCars.some(car => typeof car.id !== 'number' || typeof car.seats !== 'number')) {
            res.status(400).json({ error: 'Invalid format' });
            return;
        }
        cars = newCars;
        res.status(200).json({ message: 'Car list registered' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.loadCars = loadCars;
