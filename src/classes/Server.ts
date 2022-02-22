import { LOG_COLOR } from '../utils/Logger.util';
import Logger from '../utils/Logger.util';
import { Middleware } from '../types';
import express from 'express';
import { Controller } from './Controller';
import { middlewares, middlewaresError } from '../middlewares';

/**
 *
 *
 * @export
 * @class Server
 */
export class Server {
    private readonly port: number;
    readonly express: express.Express;
    private readonly controllers: Controller[] = [];
    private readonly environment =
        process.env['NODE_ENV'] ?? 'Node environment not defined';
    private readonly middlewares: Middleware[] = [];
    constructor(port: number) {
        this.port = port;
        this.express = express();
        this.setGlobalMiddleWare(...middlewares);
    }

    /**
     *
     *
     * @param {...Middleware[]} middlewares
     * @memberof Server
     */
    setGlobalMiddleWare(...middlewares: Middleware[]): void {
        this.middlewares.push(...middlewares);
        this.express.use(...middlewares);
    }

    /**
     *
     *
     * @param {Controller[]} controllers
     * @memberof Server
     */
    setControllers(controllers: Controller[]): void {
        this.controllers.push(...controllers);
        this.controllers.forEach((controller) => {
            this.express.use(controller.endPoint, controller.router);
        });
    }

    /**
     *
     *
     * @param {() => void} [callback]
     * @memberof Server
     */
    run(callback?: () => void): void {
        this.express.use(...middlewaresError);

        if (this.controllers.length === 0) {
            throw new Error('`No controller was added');
        }
        this.express.listen(this.port, () => {
            Logger.info(
                `Listening on ${this.port} ${LOG_COLOR.FgBlue} [${this.environment}]`
            );
            if (callback !== undefined) {
                callback();
            }
        });
    }
}
