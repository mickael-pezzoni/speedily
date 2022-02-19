import { NextFunction, Request, Response } from 'express';

export type Middleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => void | Promise<void>;

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type FullEntity<T> = {
    [key in keyof T]-?: T[key];
};

export type ParamType = string;

export interface RouteOption {
    middlewares: Middleware[];
}
