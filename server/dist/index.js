"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const logger_1 = require("./logger");
const app_1 = require("./app");
const server = http_1.default.createServer(app_1.app);
server.listen(3000, () => {
    logger_1.logger.info("Server is running on port 3000");
});
