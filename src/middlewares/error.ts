import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../classes/HttpError';
import Logger from '../utils/Logger.util';

/**
 *
 *
 * @export
 * @param {HttpError} err
 * @param {Request} _req
 * @param {Response} _res
 * @param {NextFunction} next
 */
export function logError(
    err: HttpError,
    _req: Request,
    _res: Response,
    next: NextFunction
): void {
    Logger.error(JSON.stringify(err));
    next();
}
/**
 *
 *
 * @export
 * @param {HttpError} err
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function errorHandler(
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    res.status(err.httpCode).send({ ...err, url: req.originalUrl });
    next(err);
}
