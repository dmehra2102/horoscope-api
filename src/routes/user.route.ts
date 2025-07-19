import { Router } from "express";
import { Routes } from "@/interfaces";
import { HoroscopeController } from "@/controllers";
import { ensureAuthenticated } from "@/middlewares";

export class HoroscopeRoute implements Routes {
  public path: string = "/horoscope";
  public router: Router = Router();
  public horoscopeController = new HoroscopeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/today`,
      ensureAuthenticated,
      this.horoscopeController.getTodaysHoroscope
    );
    this.router.get(
      `${this.path}/history`,
      ensureAuthenticated,
      this.horoscopeController.getHoroscopeHistory
    );
  }
}
