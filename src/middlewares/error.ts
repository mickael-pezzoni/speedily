import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../classes/HttpError';
import Logger from '../utils/Logger';

export function logError(
    err: HttpError,
    _req: Request,
    _res: Response,
    next: NextFunction
): void {
    Logger.error(JSON.stringify(err));
    next();
}

export function errorHandler(
    err: HttpError,
    _req: Request,
    res: Response,
    next: NextFunction
): void {
    res.status(err.httpCode).send(err);
    next(err);
}
