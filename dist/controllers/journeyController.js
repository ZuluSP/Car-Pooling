"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleJourney = void 0;
const journeyService_1 = require("../services/journeyService");
const handleJourney = (req, res) => {
    const status = (0, journeyService_1.registerJourney)(req.body);
    if (status === 400) {
        res.status(400).json({ error: 'Invalid format' });
        return;
    }
    res.status(status).json({ message: status === 200 ? 'Group assigned to a car' : 'Group is waiting' });
};
exports.handleJourney = handleJourney;
