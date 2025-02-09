"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const journeyController_1 = require("../controllers/journeyController");
const router = (0, express_1.Router)();
router.post('/journey', journeyController_1.handleJourney);
exports.default = router;
