import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { Routes } from "@/interfaces";
import { connect, set } from "mongoose";
import { logger, stream } from "@/utils";
import express, { Application } from "express";
import { PORT, NDOE_ENV, LOG_FORMAT, dbConnection } from "@/config";
import { ensureRateLimitMiddleware, errorMiddleware } from "@/middlewares";

class App {
  env: string;
  app: Application;
  port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT || 8080;
    this.env = NDOE_ENV || "development";

    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
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
    this.app.use(express.json());
    this.app.use(ensureRateLimitMiddleware);
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  private connectToDatabase() {
    if (this.env !== "production") {
      set("debug", false);
    }

    connect(dbConnection.uri, dbConnection.options)
      .then(() => {
        logger.info("DB connection established");
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
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
