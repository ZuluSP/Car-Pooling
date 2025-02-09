"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const statusRoutes_1 = __importDefault(require("./routes/statusRoutes"));
const carRoutes_1 = __importDefault(require("./routes/carRoutes"));
const journeyRoutes_1 = __importDefault(require("./routes/journeyRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(statusRoutes_1.default);
app.use(carRoutes_1.default);
app.use(journeyRoutes_1.default);
exports.default = app;
