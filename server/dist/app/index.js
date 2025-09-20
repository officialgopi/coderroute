"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const env_1 = require("../env");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: env_1.env.CLIENT_URL,
    credentials: true,
}));
const passport_lib_1 = require("./libs/passport.lib");
(0, passport_lib_1.initPassport)();
//Routes
const auth_route_1 = require("./features/auth/auth.route");
app.use("/api/auth", auth_route_1.authRouter);
//Global Error Handler
const error_middleware_1 = require("./middlewares/error.middleware");
app.use(error_middleware_1.globalErrorHandler);
