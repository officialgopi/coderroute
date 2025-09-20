"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerificationToken = createVerificationToken;
exports.hashToken = hashToken;
exports.generateJWT = generateJWT;
exports.sanitizeUser = sanitizeUser;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createVerificationToken() {
    return crypto_1.default.randomBytes(32).toString("hex");
}
function hashToken(token) {
    return crypto_1.default.createHash("sha256").update(token).digest("hex");
}
function generateJWT(userId, secret, expiresIn) {
    return jsonwebtoken_1.default.sign({
        userId,
    }, secret, {
        expiresIn,
    });
}
function sanitizeUser(user) {
    const sanitizedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        username: user.username,
        isEmailVerified: user.isEmailVerified,
        role: user.role,
        authProvider: user.authProvider,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
    return sanitizedUser;
}
