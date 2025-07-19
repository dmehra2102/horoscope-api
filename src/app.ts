import { logger } from "@/utils";
import { PORT, NDOE_ENV } from "@/config";
import express, { Application } from "express";

class App {
  env: string;
  app: Application;
  port: string | number;

  constructor() {
    this.app = express();
    this.port = PORT || 8080;
    this.env = NDOE_ENV || "development";
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
