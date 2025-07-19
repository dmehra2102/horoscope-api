import { Router } from "express";
import { Routes } from "@/interfaces";
import { UserController } from "@/controllers";

export class UserRoute implements Routes {
  public path: string = "/user";
  public router: Router = Router();
  public authController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {}
}
