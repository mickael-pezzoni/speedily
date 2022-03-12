/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Middleware, RequestFunction, RouteOptions } from './../types';
import { NextFunction, Request, Response, Router } from 'express';
import { execRequestFunction } from '../utils/route.util';

/**
 *
 *
 * @export
 * @abstract
 * @class Route
 */
export abstract class Route {
    private readonly _endPoint: string;
    protected readonly middlewares: Middleware[] = [];
    readonly requestFunction: RequestFunction;
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
        this._endPoint = endPoint;
        this.routeOptions = routeOptions;
        this.middlewares = middlewares;
        this.requestFunction = requestFunction;
    }

    /**
     *
     *
     * @readonly
     * @type {string}
     * @memberof Route
     */
    get endPoint(): string {
        return this._endPoint;
    }

    /**
     *
     *
     * @abstract
     * @param {Router} router
     * @memberof Route
     */
    // eslint-disable-next-line no-unused-vars
    abstract registerOn(router: Router): void;
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
     * @param {RouteOptions} [routeOptions]
     * @param {...Middleware[]} middlewares
     * @memberof Post
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
 * @class Put
 * @extends {Route}
 */
export class Put extends Route {
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
     * @param {RouteOptions} [routeOptions]
     * @param {...Middleware[]} middlewares
     * @memberof Put
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
 * @class Patch
 * @extends {Route}
 */
export class Patch extends Route {
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
     * @param {RouteOptions} [routeOptions]
     * @param {...Middleware[]} middlewares
     * @memberof Patch
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
