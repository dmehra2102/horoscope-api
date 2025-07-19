import { Request, NextFunction, Response } from "express";

export class HoroscopeController {
  public getTodaysHoroscope = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.send("Hello World");
  };

  public getHoroscopeHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {};
}
