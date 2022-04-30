import express from 'express';

import { middlewares, middlewaresError } from '../middlewares';
import { Middleware } from '../types/types';
import { FntAuth } from './Context';
import { Controller } from './Controller';
import Logger, { LOG_COLOR } from './Logger';

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
     * @param {...Middleware[]} newMiddlewares
     * @memberof Server
     */
    setGlobalMiddleWare(...newMiddlewares: Middleware[]): void {
        this.middlewares.push(...newMiddlewares);
        this.express.use(...newMiddlewares);
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
     * @param {FntAuth} authFnt
     * @param {Controller[]} [controllers=this.controllers]
     * @memberof Server
     */
    enableBearerAuth(
        authFnt: FntAuth,
        controllers: Controller[] = this.controllers
    ): void {
        controllers.forEach((controller) =>
            controller.enableBearerAuth(authFnt)
        );
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
