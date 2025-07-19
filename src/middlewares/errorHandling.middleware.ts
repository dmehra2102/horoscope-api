import { logger } from "@/utils";
import { Request, Response, NextFunction } from "express";

export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const errorMiddleware = async (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    logger.error(
      `[${request.method}] ${request.path} >> StatusCode:: ${status}, Message : ${message}`
    );

    return response.status(status).send({ message });
  } catch (error) {
    return response.status(500).send({
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};
