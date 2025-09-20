"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const db_1 = require("../../db");
const env_1 = require("../../env");
const auth_service_1 = require("../features/auth/auth.service");
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (0, utils_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        throw new utils_1.ApiError(401, "Unauthorized");
    }
    const decoded = jsonwebtoken_1.default.verify(accessToken, env_1.env.JWT_SECRET);
    if (!decoded.userId) {
        throw new utils_1.ApiError(401, "Unauthorized");
    }
    if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
        throw new utils_1.ApiError(401, "Token expired");
    }
    const user = yield db_1.db.user.findUnique({
        where: {
            id: decoded.userId,
        },
    });
    if (!user) {
        throw new utils_1.ApiError(401, "Unauthorized");
    }
    req.user = (0, auth_service_1.sanitizeUser)(user);
    next();
}));
exports.isAuthenticated = isAuthenticated;
