import { Request } from 'express';

import {
    ClassValidator,
    QueryParams,
    RequestBody,
    RouteData,
    RouteParams,
} from '../types/simple.type';
import { BadRequestError } from './HttpError';
import { Validator } from './Validator';

/**
 *
 *
 * @export
 * @interface RouteOptions
 */
export interface RouteOptions {
    queryValidator?: ClassValidator;
    bearerAuthFnt?: FntAuth;
    data?: RouteData;
}

/**
 *
 *
 * @export
 * @interface BodyRouteOptions
 * @extends {RouteOptions}
 */
export interface BodyRouteOptions extends RouteOptions {
    bodyValidator?: ClassValidator;
}

export type RequestFunction = (
    requestParams: Context
) => Promise<unknown> | unknown;

export type FntAuth = (
    jwt: string,
    context: Context
) => Promise<boolean | void> | boolean;

/**
 *
 *
 * @class Params
 * @extends {Validator}
 */
export class Params extends Validator {
    readonly routeParams: RouteParams | QueryParams;

    /**
     * Creates an instance of Params.
     * @param {(RouteParams | QueryParams)} routeParams
     * @param {ClassValidator} [classValidator]
     * @memberof Params
     */
    constructor(
        routeParams: RouteParams | QueryParams,
        classValidator?: ClassValidator
    ) {
        super(classValidator);
        this.routeParams = routeParams;
    }

    /**
     *
     *
     * @template T
     * @param {string} key
     * @return {*}  {(T | undefined)}
     * @memberof Params
     */
    get<T = unknown>(key: string): T | undefined {
        return this.routeParams[key] as T | undefined;
    }

    /**
     *
     *
     * @template T
     * @param {string} key
     * @return {*}  {T}
     * @memberof Params
     */
    getOrFail<T = unknown>(key: string): T {
        if (key in this.routeParams) {
            return this.routeParams[key] as T;
        }
        throw new BadRequestError(`Params #${key} is missing`);
    }
}

/**
 *
 *
 * @class Body
 * @extends {Validator}
 */
export class Body extends Validator {
    private readonly body: RequestBody;
    /**
     * Creates an instance of Body.
     * @param {RequestBody} body
     * @param {ClassValidator} [classValidator]
     * @memberof Body
     */
    constructor(body: RequestBody, classValidator?: ClassValidator) {
        super(classValidator);
        this.body = body;
    }

    /**
     *
     *
     * @template T
     * @return {*}  {T}
     * @memberof Body
     */
    get<T>(): T {
        return this.body as T;
    }
}

/**
 *
 *
 * @export
 * @class Context
 */
export class Context {
    /**
     *
     *
     * @type {Params}
     * @memberof Context
     */
    readonly params: Params;
    /**
     *
     *
     * @type {Params}
     * @memberof Context
     */
    readonly queryParams: Params;
    /**
     *
     *
     * @private
     * @type {RouteOptions}
     * @memberof Context
     */
    private readonly routeOptions: RouteOptions;
    /**
     *
     *
     * @type {Body}
     * @memberof Context
     */
    readonly body: Body;

    /**
     *
     *
     * @type {Request}
     * @memberof Context
     */
    readonly request: Request;

    /**
     * Creates an instance of Context.
     * @param {Request} request
     * @param {RouteOptions} routeOptions
     * @memberof Context
     */
    constructor(request: Request, routeOptions: RouteOptions) {
        this.request = request;
        this.routeOptions = routeOptions;
        this.params = new Params(request.params);
        this.queryParams = new Params(
            request.query,
            routeOptions.queryValidator
        );

        this.body = new Body(
            request.body as Record<PropertyKey, unknown>,
            this.routeHasBody(this.routeOptions)
                ? this.routeOptions.bodyValidator
                : undefined
        );
    }

    private routeHasBody(
        routeOptions: RouteOptions
    ): routeOptions is BodyRouteOptions {
        return 'bodyValidator' in routeOptions;
    }

    /**
     *
     *
     * @readonly
     * @type {(RouteData | undefined)}
     * @memberof Context
     */
    get data(): RouteData | undefined {
        return this.routeOptions.data;
    }
}
