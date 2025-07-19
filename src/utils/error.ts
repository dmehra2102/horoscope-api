import { HttpException } from "@/middlewares";

export const createError = (status: number, messaeg: string): HttpException => {
  const newError = new HttpException(status, messaeg);
  return newError;
};
