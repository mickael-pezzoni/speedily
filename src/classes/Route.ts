/* eslint-disable @typescript-eslint/no-misused-promises */
import { NextFunction, Request, Response, Router } from 'express';

import { Middleware } from '../types/types';
import { execRequestFunction } from '../utils/route.util';
import { BodyRouteOptions, RequestFunction, RouteOptions } from './Context';

/**
 *
 *
 * @export
 * @abstract
 * @class Route
 */
export abstract class Route {
    /**
     *
     *
     * @type {string}
     * @memberof Route
     */
    readonly endPoint: string;
    /**
     *
     *
     * @protected
     * @type {Middleware[]}
     * @memberof Route
     */
    protected readonly middlewares: Middleware[] = [];
    /**
     *
     *
     * @type {RequestFunction}
     * @memberof Route
     */
    readonly requestFunction: RequestFunction;
    /**
     *
     *
     * @type {RouteOptions}
     * @memberof Route
     */
    readonly routeOptions: RouteOptions;

    /**
     * Creates an instance of Route.
     * @param {string} endPoint
     * @param {RequestFunction} requestFunction
     * @param {RouteOptions} [routeOptions={}]
     * @param {...Middleware[]} middlewares
     * @memberof Route
     */
    constructor(
        endPoint: string,
        requestFunction: RequestFunction,
        routeOptions: RouteOptions = {},
        ...middlewares: Middleware[]
    ) {
        this.endPoint = endPoint;
        this.routeOptions = routeOptions;
        this.middlewares = middlewares;
        this.requestFunction = requestFunction;
    }

    /**
     *
     *
     * @abstract
     * @param {Router} router
     * @memberof Route
     */
    abstract registerOn(router: Router): void;

    /**
     *
     *
     * @param {...Middleware[]} middlewares
     * @memberof Route
     */
    setMiddlewares(...middlewares: Middleware[]): void {
        this.middlewares.push(...middlewares);
    }
}

/**
 *
 *
 * @export
 * @class Get
 * @extends {Route}
 */
export class Get extends Route {
    /**
     *
     *
     * @param {Router} router
     * @memberof Get
     */
    registerOn(router: Router): void {
        router.get(
            this.endPoint,
            ...this.middlewares,
            (req: Request, res: Response, next: NextFunction) =>
                execRequestFunction(req, res, next, this)
        );
    }

    /**
     * Creates an instance of Get.
     * @param {string} endPoint
     * @param {RequestFunction} requestFunction
     * @param {RouteOptions} [routeOptions]
     * @param {...Middleware[]} middlewares
     * @memberof Get
     */
    constructor(
        endPoint: string,
        requestFunction: RequestFunction,
        routeOptions?: RouteOptions,
        ...middlewares: Middleware[]
    ) {
        super(endPoint, requestFunction, routeOptions, ...middlewares);
    }
}

/**
 *
 *
 * @export
 * @class Post
 * @extends {Route}
 */
export class Post extends Route {
    /**
     *
     *
     * @param {Router} router
     * @memberof Post
     */
    registerOn(router: Router): void {
        router.post(
            this.endPoint,
            ...this.middlewares,
            (req: Request, res: Response, next: NextFunction) =>
                execRequestFunction(req, res, next, this)
        );
    }

    /**
     * Creates an instance of Post.
     * @param {string} endPoint
     * @param {RequestFunction} requestFunction
     * @param {BodyRouteOptions} [routeOptions]
     * @param {...Middleware[]} middlewares
     * @memberof Post
     */
    constructor(
        endPoint: string,
        requestFunction: RequestFunction,
        routeOptions?: BodyRouteOptions,
        ...middlewares: Middleware[]
    ) {
        super(endPoint, requestFunction, routeOptions, ...middlewares);
    }
}

/**
 *
 *
 * @export
 * @class Put
 * @extends {Route}
 */
export class Put extends Route {
    /**
     *
     *
     * @param {Router} router
     * @memberof Put
     */
    registerOn(router: Router): void {
        router.put(
            this.endPoint,
            ...this.middlewares,
            (req: Request, res: Response, next: NextFunction) =>
                execRequestFunction(req, res, next, this)
        );
    }
    /**
     * Creates an instance of Put.
     * @param {string} endPoint
     * @param {RequestFunction} requestFunction
     * @param {BodyRouteOptions} [routeOptions]
     * @param {...Middleware[]} middlewares
     * @memberof Put
     */
    constructor(
        endPoint: string,
        requestFunction: RequestFunction,
        routeOptions?: BodyRouteOptions,
        ...middlewares: Middleware[]
    ) {
        super(endPoint, requestFunction, routeOptions, ...middlewares);
    }
}

/**
 *
 *
 * @export
 * @class Patch
 * @extends {Route}
 */
export class Patch extends Route {
    /**
     *
     *
     * @param {Router} router
     * @memberof Patch
     */
    registerOn(router: Router): void {
        router.patch(
            this.endPoint,
            ...this.middlewares,
            (req: Request, res: Response, next: NextFunction) =>
                execRequestFunction(req, res, next, this)
        );
    }
    /**
     * Creates an instance of Patch.
     * @param {string} endPoint
     * @param {RequestFunction} requestFunction
     * @param {BodyRouteOptions} [routeOptions]
     * @param {...Middleware[]} middlewares
     * @memberof Patch
     */
    constructor(
        endPoint: string,
        requestFunction: RequestFunction,
        routeOptions?: BodyRouteOptions,
        ...middlewares: Middleware[]
    ) {
        super(endPoint, requestFunction, routeOptions, ...middlewares);
    }
}

/**
 *
 *
 * @export
 * @class Delete
 * @extends {Route}
 */
export class Delete extends Route {
    registerOn(router: Router): void {
        router.delete(
            this.endPoint,
            ...this.middlewares,
            (req: Request, res: Response, next: NextFunction) =>
                execRequestFunction(req, res, next, this)
        );
    }
    /**
     * Creates an instance of Delete.
     * @param {string} endPoint
     * @param {RequestFunction} requestFunction
     * @param {RouteOptions} [routeOptions]
     * @param {...Middleware[]} middlewares
     * @memberof Delete
     */
    constructor(
        endPoint: string,
        requestFunction: RequestFunction,
        routeOptions?: RouteOptions,
        ...middlewares: Middleware[]
    ) {
        super(endPoint, requestFunction, routeOptions, ...middlewares);
    }
}
