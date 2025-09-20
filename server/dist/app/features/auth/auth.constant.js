"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS_OPTIONS = void 0;
const env_1 = require("../../../env");
exports.CORS_OPTIONS = {
    origin: env_1.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
