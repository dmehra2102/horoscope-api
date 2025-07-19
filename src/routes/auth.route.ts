import { Router } from "express";
import { Routes } from "@/interfaces";
import { AuthController } from "@/controllers";

export class AuthRoute implements Routes {
  public path: string = "/auth";
  public router: Router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {}
}
