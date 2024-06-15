import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { IServerConfig } from './config';
import router from './routes';
import logger from './lib/logger';

class Server {
    private readonly app: express.Application;

    private readonly config: IServerConfig;

    constructor(config: IServerConfig) {
        this.app = express();
        this.config = config;

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

    run = async (): Promise<void> => {
        this.app.listen(this.config.port, () => {
            console.info(`Node Server Running In ${this.config.devMode} On Port http://localhost:${this.config.port}`);
            logger.info(`Node Server Running In ${this.config.devMode} On Port http://localhost:${this.config.port}`);
        });
    };
}

export default Server;
