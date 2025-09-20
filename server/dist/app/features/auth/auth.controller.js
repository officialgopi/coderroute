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
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.logout = exports.getProfile = exports.oauthLogin = void 0;
const db_1 = require("../../../db");
const env_1 = require("../../../env");
const utils_1 = require("../../utils");
const auth_constant_1 = require("./auth.constant");
const auth_service_1 = require("./auth.service");
const oauthLogin = (0, utils_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.user) {
        return res.redirect(env_1.env.CLIENT_URL);
    }
    const intermediateData = req.user;
    let user = yield db_1.db.user.findUnique({
        where: {
            email: intermediateData.email,
        },
    });
    if (!user) {
        user = yield db_1.db.user.create({
            data: {
                email: intermediateData.email,
                name: intermediateData.name,
                username: (_a = intermediateData.username) !== null && _a !== void 0 ? _a : intermediateData.email.split("@")[0] +
                    Math.floor(Math.random() * 10000),
                avatar: intermediateData.avatar,
                isEmailVerified: true,
                authProvider: "GOOGLE",
            },
        });
    }
    const accessToken = (0, auth_service_1.generateJWT)(user.id, env_1.env.JWT_SECRET, env_1.env.JWT_EXPIRES_IN);
    const refreshToken = (0, auth_service_1.generateJWT)(user.id, env_1.env.JWT_REFRESH_SECRET, env_1.env.JWT_REFRESH_EXPIRES_IN);
    yield db_1.db.session.create({
        data: {
            userId: user.id,
            token: refreshToken,
            sessionExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
    });
    res.cookie("access-token", accessToken, auth_constant_1.CORS_OPTIONS);
    res.cookie("refresh-token", refreshToken, auth_constant_1.CORS_OPTIONS);
    return res.redirect(env_1.env.CLIENT_URL);
}));
exports.oauthLogin = oauthLogin;
const getProfile = (0, utils_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new utils_1.ApiError(401, "Unauthorized");
    }
    const user = yield db_1.db.user.findUnique({
        where: {
            id: req.user.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            username: true,
            avatar: true,
            isEmailVerified: true,
            role: true,
            authProvider: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user) {
        throw new utils_1.ApiError(404, "User not found");
    }
    new utils_1.ApiResponse(200, {
        user: (0, auth_service_1.sanitizeUser)(user),
    }, "User fetched successfully").send(res);
}));
exports.getProfile = getProfile;
const logout = (0, utils_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const refreshToken = req.cookies["refresh-token"];
        if (refreshToken) {
            yield db_1.db.session.deleteMany({
                where: {
                    token: refreshToken,
                },
            });
        }
    }
    res.clearCookie("access-token", auth_constant_1.CORS_OPTIONS);
    res.clearCookie("refresh-token", auth_constant_1.CORS_OPTIONS);
    new utils_1.ApiResponse(200, null, "Logged out successfully").send(res);
}));
exports.logout = logout;
const refreshAccessToken = (0, utils_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken) {
        throw new utils_1.ApiError(401, "Unauthorized");
    }
    const session = yield db_1.db.session.findUnique({
        where: {
            token: refreshToken,
        },
        include: {
            user: true,
        },
    });
    if (!session ||
        !session.user ||
        session.sessionExpiry < new Date() // Check if session is expired
    ) {
        throw new utils_1.ApiError(401, "Unauthorized");
    }
    const newAccessToken = (0, auth_service_1.generateJWT)(session.user.id, env_1.env.JWT_SECRET, env_1.env.JWT_EXPIRES_IN);
    const newRefreshToken = (0, auth_service_1.generateJWT)(session.user.id, env_1.env.JWT_REFRESH_SECRET, env_1.env.JWT_REFRESH_EXPIRES_IN);
    yield db_1.db.session.update({
        where: {
            id: session.id,
        },
        data: {
            // Extend session expiry on refresh
            token: newRefreshToken,
            sessionExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
    });
    res.cookie("access-token", newAccessToken, auth_constant_1.CORS_OPTIONS);
    res.cookie("refresh-token", newRefreshToken, auth_constant_1.CORS_OPTIONS);
    new utils_1.ApiResponse(200, null, "Access token refreshed successfully").send(res);
}));
exports.refreshAccessToken = refreshAccessToken;
