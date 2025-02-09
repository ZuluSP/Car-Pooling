"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleJourney = void 0;
const journeyService_1 = require("../services/journeyService");
const handleJourney = (req, res) => {
    const { status, message } = (0, journeyService_1.registerJourney)(req.body);
    res.status(status).json({ message });
};
exports.handleJourney = handleJourney;
