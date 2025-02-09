"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDropoff = void 0;
const journeyService_1 = require("../services/journeyService");
const handleDropoff = (req, res) => {
    const groupId = Number(req.body.ID);
    if (!groupId || isNaN(groupId)) {
        res.status(400).json({ error: 'Invalid group ID' });
        return;
    }
    const { status, message } = (0, journeyService_1.dropoffGroup)(groupId);
    res.status(status).json({ message });
};
exports.handleDropoff = handleDropoff;
