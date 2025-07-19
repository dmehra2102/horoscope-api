import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { Routes } from "@/interfaces";
import { logger, stream } from "@/utils";
import express, { Application } from "express";
import { PORT, NDOE_ENV, LOG_FORMAT } from "@/config";

class App {
  env: string;
  app: Application;
  port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT || 8080;
    this.env = NDOE_ENV || "development";

    this.initializeMiddleware();
    this.initializeRoutes(routes);
  }

  private initializeMiddleware() {
    this.app.use(
      cors({
        origin: [/localhost:/],
        credentials: true,
      })
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(
        `🚀 🚀 Knock knock, who's there? It's your http server, listening on port ${this.port}! 🚀 🚀`
      );
      logger.info(`=================================`);
    });
  }
}

export default App;
