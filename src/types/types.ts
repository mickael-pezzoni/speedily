import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../classes/HttpError';

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
