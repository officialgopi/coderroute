"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = exports.ApiError = void 0;
exports.AsyncHandler = AsyncHandler;
// ============ AsyncHandler function to wrap async route handlers and catch errors ================
function AsyncHandler(requestHandler) {
    return function (req, res, next) {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            next(err);
        });
    };
}
// ============ ApiError and ApiResponse classes for standardized API responses and error handling ================
class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        }
        else {
            // ============ Error.captureStackTrace(this, this.constructor) is called to generate a stack trace automatically ================
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ApiError = ApiError;
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
    send(res) {
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            data: this.data,
        });
    }
}
exports.ApiResponse = ApiResponse;
