/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BodyRequestFunction, Middleware, RequestFunction } from './../types';
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
    protected readonly requestFunction: RequestFunction | BodyRequestFunction;
    constructor(
        endPoint: string,
        requestFunction: RequestFunction | BodyRequestFunction,
        ...middlewares: Middleware[]
    ) {
        this._endPoint = endPoint;
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
                execRequestFunction(req, res, next, this.requestFunction)
        );
    }
    /**
     * Creates an instance of Get.
     * @param {string} endPoint
     * @param {...Middleware[]} middlewares
     * @memberof Get
     */
    constructor(
        endPoint: string,
        requestFunction: RequestFunction,
        ...middlewares: Middleware[]
    ) {
        super(endPoint, requestFunction, ...middlewares);
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
                execRequestFunction(req, res, next, this.requestFunction, true)
        );
    }
    constructor(
        endPoint: string,
        requestFunction: BodyRequestFunction,
        ...middlewares: Middleware[]
    ) {
        super(endPoint, requestFunction, ...middlewares);
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
                execRequestFunction(req, res, next, this.requestFunction, true)
        );
    }
    constructor(
        endPoint: string,
        requestFunction: BodyRequestFunction,
        ...middlewares: Middleware[]
    ) {
        super(endPoint, requestFunction, ...middlewares);
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
                execRequestFunction(req, res, next, this.requestFunction, true)
        );
    }
    constructor(
        endPoint: string,
        requestFunction: BodyRequestFunction,
        ...middlewares: Middleware[]
    ) {
        super(endPoint, requestFunction, ...middlewares);
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
                execRequestFunction(req, res, next, this.requestFunction)
        );
    }
    constructor(
        endPoint: string,
        requestFunction: RequestFunction,
        ...middlewares: Middleware[]
    ) {
        super(endPoint, requestFunction, ...middlewares);
    }
}
