import { NextFunction, Request, Response } from "express";

// ============ AsyncHandler function to wrap async route handlers and catch errors ================
function AsyncHandler(
  requestHandler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response<void | any, Record<string, any>>>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      next(err);
    });
  };
}

export { AsyncHandler };

// ============ ApiError and ApiResponse classes for standardized API responses and error handling ================
class ApiError extends Error {
  public statusCode: number;
  public success: boolean;
  public errors: any[];
  public message: string;
  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors = [],
    stack: string | undefined = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      // ============ Error.captureStackTrace(this, this.constructor) is called to generate a stack trace automatically ================
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class ApiResponse {
  public statusCode: number;
  public data: any;
  public success: boolean;
  public message: string;

  constructor(statusCode: number, data: any, message: string = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  public send(res: Response) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
}

export { ApiError, ApiResponse };
