import Logger from './utils/Logger';
import { Middleware } from './types';
import express from 'express';
import middlewares from './middlewares';
import logRequest from './middlewares/logger';

class Server {
    private readonly port: number;
    readonly express: express.Express;
    private readonly middlewares: Middleware[] = [];
    constructor(port: number) {
        this.port = port;
        this.express = express();
        this.setGlobalMiddleWare(...middlewares);
    }

    /**
     *
     * @param middlewares
     */
    setGlobalMiddleWare(...middlewares: Middleware[]): void {
        this.middlewares.push(...middlewares);
        this.express.use(logRequest);
    }

    /**
     *
     * @param callback
     */
    run(callback?: () => void): void {
        this.express.listen(this.port, () => {
            Logger.info(`Listening on ${this.port}`);
            if (callback !== undefined) {
                callback();
            }
        });
    }
}

export default Server;
