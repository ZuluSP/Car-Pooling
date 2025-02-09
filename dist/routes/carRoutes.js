"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carController_1 = require("../controllers/carController");
const router = (0, express_1.Router)();
router.put('/cars', carController_1.loadCars);
exports.default = router;
