import { Router } from 'express';
import { BodyRequestFunction, RequestFunction, Middleware } from '../types';
import { Delete, Get, Patch, Post, Put, Route } from './Route';
import Logger from '../utils/Logger.util';

/**
 *
 *
 * @export
 * @class Controller
 */
export class Controller {
    private readonly routes: Route[] = [];
    readonly router: Router;
    readonly endPoint: string;
    constructor(endPoint: string) {
        this.endPoint = endPoint;
        this.router = Router();
        Logger.debug(`Create controller : {${this.endPoint}}`);
    }

    /**
     *
     *
     * @param {Route} route
     * @return {*}  {Controller}
     * @memberof Controller
     */
    addRoute(route: Route): Controller {
        route.registerOn(this.router);
        Logger.debug(
            `Mapping route : ${route.constructor.name} - {${this.endPoint}${route.endPoint}}`
        );
        this.routes.push(route);
        return this;
    }

    /**
     *
     *
     * @param {Middleware} middleware
     * @return {*}  {Controller}
     * @memberof Controller
     */
    addMiddleware(middleware: Middleware): Controller {
        this.router.use(middleware);
        return this;
    }

    /**
     *
     *
     * @param {string} endPoint
     * @param {RequestFunction} requestFunction
     * @param {...Middleware[]} middlewares
     * @return {*}  {Controller}
     * @memberof Controller
     */
    get(
        endPoint: string,
        requestFunction: RequestFunction,
        ...middlewares: Middleware[]
    ): Controller {
        const route = new Get(endPoint, requestFunction, ...middlewares);
        this.addRoute(route);

        return this;
    }

    /**
     *
     *
     * @param {string} endPoint
     * @param {BodyRequestFunction} requestFunction
     * @param {...Middleware[]} middlewares
     * @return {*}  {Controller}
     * @memberof Controller
     */
    post(
        endPoint: string,
        requestFunction: BodyRequestFunction,
        ...middlewares: Middleware[]
    ): Controller {
        const route = new Post(endPoint, requestFunction, ...middlewares);
        this.addRoute(route);

        return this;
    }

    /**
     *
     *
     * @param {string} endPoint
     * @param {BodyRequestFunction} requestFunction
     * @param {...Middleware[]} middlewares
     * @return {*}  {Controller}
     * @memberof Controller
     */
    put(
        endPoint: string,
        requestFunction: BodyRequestFunction,
        ...middlewares: Middleware[]
    ): Controller {
        const route = new Put(endPoint, requestFunction, ...middlewares);
        this.addRoute(route);

        return this;
    }

    /**
     *
     *
     * @param {string} endPoint
     * @param {BodyRequestFunction} requestFunction
     * @param {...Middleware[]} middlewares
     * @return {*}  {Controller}
     * @memberof Controller
     */
    patch(
        endPoint: string,
        requestFunction: BodyRequestFunction,
        ...middlewares: Middleware[]
    ): Controller {
        const route = new Patch(endPoint, requestFunction, ...middlewares);
        this.addRoute(route);

        return this;
    }

    /**
     *
     *
     * @param {string} endPoint
     * @param {RequestFunction} requestFunction
     * @param {...Middleware[]} middlewares
     * @return {*}  {Controller}
     * @memberof Controller
     */
    delete(
        endPoint: string,
        requestFunction: RequestFunction,
        ...middlewares: Middleware[]
    ): Controller {
        const route = new Delete(endPoint, requestFunction, ...middlewares);
        this.addRoute(route);

        return this;
    }
}
