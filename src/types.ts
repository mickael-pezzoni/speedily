import { NextFunction, Request, Response } from 'express';
import { HttpError } from './classes/HttpError';

export type Middleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => void | Promise<void>;

export type MiddlewareError = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => void | Promise<void>;

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type FullEntity<T> = {
    [key in keyof T]-?: T[key];
};

export type ParamType = string;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RouteOption {}

export type RequestFunction = (
    params: Params,
    queryParams: QueryParams
) => unknown;

export type BodyRequestFunction = (
    params: Params,
    body: Body,
    queryParams: QueryParams
) => unknown;

export type Params = Record<string, unknown>;
export type QueryParams = Record<string, unknown>;
export type Body = Record<string, unknown>;
/**
 *
 *
 * @export
 * @enum {number}
 */
export enum HttpResponseCode {
    INTERNAL_ERROR = 500,
    NOT_IMPLEMENTED_ERROR = 501,
    NOT_FOUND = 404,
    NOT_AUTHORIZED = 401,
    BAD_REQUEST = 400,
    NO_CONTENT = 204,
    SUCCESS = 200,
}

/**
 *
 *
 * @export
 * @interface ExpressError
 */
export interface ExpressError {
    throwAt: Date;
    msg: string;
    httpCode: HttpResponseCode;
}
