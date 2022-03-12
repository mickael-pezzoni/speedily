/* eslint-disable no-unused-vars */
import { Context } from './classes/Context';
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

export type RequestFunction = (
    requestParams: Context
) => Promise<unknown> | unknown;

export interface RouteOptions {
    queryValidator?: ClassValidator;
    bodyValidator?: ClassValidator;
}

export type ClassValidator = new () => object;

export type RouteParams = Record<string, string>;
export type QueryParams = Record<string, unknown>;
export type RequestBody = Record<string, unknown>;
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
    httpCode: HttpResponseCode | number;
}
