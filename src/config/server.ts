import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "../shared/logger/morganLogger";
import { APP } from "../constants/app";
import Logger from "../shared/logger/appLogger";
import UserRoutes from "../Users/routes/users.routes";
import CollectorRoutes from "../Collectors/routes/collector.routes";

class Server {
  app: Application;
  port: string;
  constructor() {
    this.app = express();
    this.port = APP.PORT_SERVER;

    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan);
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/v1/users", UserRoutes);
    this.app.use("/api/v1/collectors", CollectorRoutes);
  }

  errorHandler() {
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        res
          .status(err.statusCode)
          .json({ type: err.errorType, msg: err.message, status: false });
      }
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      Logger.info(`Server on port ${this.port}`);
    });
  }
}

export default Server;
