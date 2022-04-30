import { Router } from 'express';

import { bearerAuth } from '../middlewares/auth';
import { Middleware } from '../types/types';
import {
    BodyRouteOptions,
    FntAuth,
    RequestFunction,
    RouteOptions,
} from './Context';
import Logger from './Logger';
import { Delete, Get, Patch, Post, Put, Route } from './Route';

/**
 *
 *
 * @export
 * @class Controller
 */
export class Controller {
    private readonly routes: Route[] = [];
    private authFnt?: FntAuth;
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
        Logger.debug(
            `Create controller : ${this.authFnt !== undefined ? '🔒' : ''} {${
                this.endPoint
            }}`
        );
    }

    /**
     *
     *
     * @param {Route} route
     * @return {*}  {Controller}
     * @memberof Controller
     */
    addRoute(route: Route): Controller {
        const controllerAuthFnt = this.authFnt;
        if (controllerAuthFnt !== undefined) {
            this.applyAuthMiddleware(route, controllerAuthFnt);
        }
        const routeAuthFnt = route.routeOptions.bearerAuthFnt;
        if (controllerAuthFnt === undefined && routeAuthFnt !== undefined) {
            this.applyAuthMiddleware(route, routeAuthFnt);
        }
        const routeIsAuth =
            controllerAuthFnt !== undefined || routeAuthFnt !== undefined;
        route.registerOn(this.router);
        Logger.debug(
            `${routeIsAuth ? '🔒 ' : ''}Mapped route : ${
                route.constructor.name
            } - {${this.endPoint}${route.endPoint}}`
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
     * @private
     * @param {Route} route
     * @param {FntAuth} authFnt
     * @memberof Controller
     */
    private applyAuthMiddleware(route: Route, authFnt: FntAuth): void {
        route.setMiddlewares((req, res, next) =>
            bearerAuth(req, res, next, route.routeOptions, authFnt)
        );
    }
    /**
     *
     *
     * @param {FntAuth} authFnt
     * @return {*}  {Controller}
     * @memberof Controller
     */
    enableBearerAuth(authFnt: FntAuth): Controller {
        this.authFnt = authFnt;

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
        routeOption?: BodyRouteOptions,
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
        routeOptions?: BodyRouteOptions,
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
        routeOptions?: BodyRouteOptions,
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
