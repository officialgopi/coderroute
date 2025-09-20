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
exports.Judge0 = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../env");
class Judge0Sdk {
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    getJudge0LanguageId(language) {
        var _a;
        return ((_a = this.languageMap[language.toUpperCase()]) !== null && _a !== void 0 ? _a : undefined);
    }
    getJudge0LanguageName(languageId) {
        return Object.keys(this.languageMap).find((key) => this.languageMap[key] ===
            languageId);
    }
    constructor({ baseUrl, apiKey }) {
        this.languageMap = {
            PYTHON: 71,
            JAVASCRIPT: 63,
        };
        if (!baseUrl) {
            throw new Error("Base URL is required for Judge0 SDK");
        }
        this.baseUrl = baseUrl;
        this.api = axios_1.default.create({
            baseURL: this.baseUrl,
            headers: Object.assign({ "Content-Type": "application/json" }, (apiKey
                ? {
                    Authorization: `Bearer ${apiKey}`,
                }
                : {})),
        });
    }
    createSubmissionBatch(submissions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.api.post("/submissions/batch", {
                    submissions,
                });
                return {
                    success: true,
                    data: response.data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    error: error,
                };
            }
        });
    }
    poolBatchResults(tokens) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const maxRetries = 15;
                let attempt = 0;
                while (attempt < maxRetries) {
                    const { data, } = yield this.api.get("/submissions/batch", {
                        params: {
                            tokens: tokens.join(","),
                        },
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const isAllDone = data.submissions.every((submission) => submission.status.id >= 3);
                    if (isAllDone) {
                        return {
                            success: true,
                            data: data.submissions,
                        };
                    }
                    attempt++;
                    // Wait for 2 second before polling again
                    yield this.sleep(2000);
                }
                throw new Error("Failed to get batch results after 15 attempts");
            }
            catch (error) {
                return {
                    success: false,
                    error: error,
                };
            }
        });
    }
}
const Judge0 = new Judge0Sdk({
    baseUrl: env_1.env.JUDGE0_BASE_URL,
    apiKey: env_1.env.JUDGE0_API_KEY,
});
exports.Judge0 = Judge0;
