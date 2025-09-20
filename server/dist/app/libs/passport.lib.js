"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPassport = initPassport;
const passport_1 = __importDefault(require("passport"));
const env_1 = require("../../env");
const passport_google_oauth20_1 = require("passport-google-oauth20");
function initPassport() {
    passport_1.default.initialize();
    if (env_1.env.GOOGLE_CLIENT_ID && env_1.env.GOOGLE_CLIENT_SECRET) {
        passport_1.default.use(new passport_google_oauth20_1.Strategy({
            clientID: env_1.env.GOOGLE_CLIENT_ID,
            clientSecret: env_1.env.GOOGLE_CLIENT_SECRET,
            callbackURL: env_1.env.GOOGLE_REDIRECT_URI,
        }, (_accessToken, _refreshToken, profile, done) => {
            var _a, _b, _c, _d;
            try {
                if (!profile) {
                    return done(null);
                }
                const name = profile.displayName;
                const email = (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value;
                const avatar = (_d = (_c = profile.photos) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value;
                if (!email) {
                    return done(null, false, { message: "No email found" });
                }
                return done(null, {
                    name,
                    avatar,
                    email,
                    username: email.split("@")[0] + Math.floor(Math.random() * 10000),
                    id: email, // temporary ID until user is created
                    isEmailVerified: true,
                    role: "USER",
                    authProvider: "GOOGLE",
                });
            }
            catch (error) {
                return done(error);
            }
        }));
    }
}
