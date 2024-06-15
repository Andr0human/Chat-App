import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { IServerConfig } from './config';
import Database from './lib/database';
import logger from './lib/logger';
import router from './routes';

class Server {
  private readonly app: express.Application;

  private readonly config: IServerConfig;

  private readonly database: Database;

  constructor(config: IServerConfig) {
    this.app = express();
    this.config = config;
    this.database = Database.getInstance(this.config.mongoUrl);

    this.bootStrap();
  }

  getApp(): express.Application {
    return this.app;
  }

  private bootStrap(): void {
    this.configureMiddlewares();
    this.configureRoutes();
  }

  private configureMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan('dev'));
  }

  private configureRoutes(): void {
    this.app.use(router);
  }

  connectDB = async (): Promise<void> => {
    await this.database.connect();
  };

  disconnectDB = async (): Promise<void> => {
    await this.database.disconnect();
  };

  run = async (): Promise<void> => {
    // connect to DB
    await this.connectDB();

    this.app.listen(this.config.port, () => {
      console.info(
        `Node Server Running In ${this.config.devMode} On Port http://localhost:${this.config.port}`
      );
      logger.info(
        `Node Server Running In ${this.config.devMode} On Port http://localhost:${this.config.port}`
      );
    });
  };
}

export default Server;
