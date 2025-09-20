"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (error, _, res, __) => {
    error.statusCode || (error.statusCode = 500); //Default Status code is 500
    error.success || (error.success = false); //Success is false
    error.message || (error.message = "Something went wrong"); //Error message
    error.errors || (error.errors = []); //Errors
    //RETURN RESPONSE
    res.status(error.statusCode).json({
        statusCode: error.statusCode,
        success: error.success,
        message: error.message,
        errors: error.errors,
    });
};
exports.globalErrorHandler = globalErrorHandler;
