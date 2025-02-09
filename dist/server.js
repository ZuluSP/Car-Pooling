"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const statusRoutes_1 = __importDefault(require("./routes/statusRoutes"));
const carRoutes_1 = __importDefault(require("./routes/carRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(statusRoutes_1.default);
app.use(carRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
