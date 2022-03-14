import { Router } from 'express';
import { RequestFunction, Middleware, RouteOptions } from '../types';
import { Delete, Get, Patch, Post, Put, Route } from './Route';
import Logger from './Logger';

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
    /**
     * Creates an instance of Controller.
     * @param {string} endPoint
     * @memberof Controller
     */
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
            `Mapped route : ${route.constructor.name} - {${this.endPoint}${route.endPoint}}`
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
     * @param {RouteOptions} [routeOptions]
     * @param {Middleware[]} [middlewares=[]]
     * @return {*}  {Controller}
     * @memberof Controller
     */
    get(
        endPoint: string,
        requestFunction: RequestFunction,
        routeOptions?: RouteOptions,
        middlewares: Middleware[] = []
    ): Controller {
        const route = new Get(
            endPoint,
            requestFunction,
            routeOptions,
            ...middlewares
        );
        this.addRoute(route);

        return this;
    }

    /**
     *
     *
     * @param {string} endPoint
     * @param {RequestFunction} requestFunction
     * @param {RouteOptions} [routeOption]
     * @param {Middleware[]} [middlewares=[]]
     * @return {*}  {Controller}
     * @memberof Controller
     */
    post(
        endPoint: string,
        requestFunction: RequestFunction,
        routeOption?: RouteOptions,
        middlewares: Middleware[] = []
    ): Controller {
        const route = new Post(
            endPoint,
            requestFunction,
            routeOption,
            ...middlewares
        );
        this.addRoute(route);

        return this;
    }

    /**
     *
     *
     * @param {string} endPoint
     * @param {RequestFunction} requestFunction
     * @param {RouteOptions} [routeOptions]
     * @param {Middleware[]} [middlewares=[]]
     * @return {*}  {Controller}
     * @memberof Controller
     */
    put(
        endPoint: string,
        requestFunction: RequestFunction,
        routeOptions?: RouteOptions,
        middlewares: Middleware[] = []
    ): Controller {
        const route = new Put(
            endPoint,
            requestFunction,
            routeOptions,
            ...middlewares
        );
        this.addRoute(route);

        return this;
    }

    /**
     *
     *
     * @param {string} endPoint
     * @param {RequestFunction} requestFunction
     * @param {RouteOptions} [routeOptions]
     * @param {Middleware[]} [middlewares=[]]
     * @return {*}  {Controller}
     * @memberof Controller
     */
    patch(
        endPoint: string,
        requestFunction: RequestFunction,
        routeOptions?: RouteOptions,
        middlewares: Middleware[] = []
    ): Controller {
        const route = new Patch(
            endPoint,
            requestFunction,
            routeOptions,
            ...middlewares
        );
        this.addRoute(route);

        return this;
    }

    /**
     *
     *
     * @param {string} endPoint
     * @param {RequestFunction} requestFunction
     * @param {RouteOptions} [routeOptions]
     * @param {Middleware[]} [middlewares=[]]
     * @return {*}  {Controller}
     * @memberof Controller
     */
    delete(
        endPoint: string,
        requestFunction: RequestFunction,
        routeOptions?: RouteOptions,
        middlewares: Middleware[] = []
    ): Controller {
        const route = new Delete(
            endPoint,
            requestFunction,
            routeOptions,
            ...middlewares
        );
        this.addRoute(route);

        return this;
    }
}
