import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../common/utils/AppError";
import { z } from "zod";
import {
  clearAuthenticationCookies,
  REFRESH_PATH,
} from "../common/utils/cookie";

const formatZodError = (res: Response, err: z.ZodError) => {
  const formattedErrors = err?.issues?.map((error) => {
    return {
      field: error.path.join("."),
      message: error.message,
    };
  });

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors: formattedErrors,
  });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  console.log(`Error ocurred on PATH: ${req.path}`, err);

  if (req.path === REFRESH_PATH) {
    clearAuthenticationCookies(res);
  }

  if (err instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format, please check your request body",
    });
  }

  if (err instanceof z.ZodError) {
    return formatZodError(res, err);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      messsage: err.message,
      errorCode: err.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: err?.message || "Unknown error occurred",
  });
};
