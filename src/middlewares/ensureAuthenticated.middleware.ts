import jwt from "jsonwebtoken";
import { createError } from "@/utils";
import { SECRET_KEY } from "@/config";
import { Request, NextFunction, Response } from "express";

export interface JWTPayload {
  userId: string;
  name: string;
  email: string;
}

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return next(createError(401, "User not authenticated"));
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JWTPayload;
    if (!decoded) {
      return next(createError(401, "Access Denied: Invalid or expired token"));
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(createError(401, "Token expired"));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(createError(401, "Invalid token"));
    }
    return next(createError(401, "Authentication failed"));
  }
};
