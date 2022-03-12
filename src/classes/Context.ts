import { Validator } from './Validator';
import { ClassValidator, RequestBody, RouteOptions } from './../types';
import { BadRequestError } from './HttpError';
import { RouteParams, QueryParams } from 'types';
import { Request } from 'express';

/**
 *
 *
 * @export
 * @class Context
 */
export class Context {
    readonly params: Params;
    readonly queryParams: Params;
    private readonly routeOptions: RouteOptions;
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
        this.body = new Body(request.body, this.routeOptions.bodyValidator);
    }
}

/**
 *
 *
 * @class Params
 */
class Params extends Validator {
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
class Body extends Validator {
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

    get<T>(): T {
        return this.body as T;
    }
}
