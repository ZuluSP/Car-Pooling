"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dropoffController_1 = require("../controllers/dropoffController");
const router = (0, express_1.Router)();
router.post('/dropoff', dropoffController_1.handleDropoff);
exports.default = router;
