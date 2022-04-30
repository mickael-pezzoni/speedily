import { NextFunction, Request, Response } from 'express';

import { Context, FntAuth, RouteOptions } from '../classes/Context';
import { NotAuthorizedError } from '../classes/HttpError';
import { makeError } from '../utils/error.util';

/**
 *
 *
 * @export
 * @param {Request} req
 * @param {Response} _res
 * @param {NextFunction} next
 * @param {RouteOptions} routeOptions
 * @param {FntAuth} authFnt
 * @return {*}  {Promise<void>}
 */
export async function bearerAuth(
    req: Request,
    _res: Response,
    next: NextFunction,
    routeOptions: RouteOptions,
    authFnt: FntAuth
): Promise<void> {
    const authHeader = req.headers.authorization;

    if (authHeader === undefined) {
        next(new NotAuthorizedError(`Token is missing`));
        return;
    }
    const context = new Context(req, routeOptions);
    const token = authHeader.split(' ')[1];
    try {
        const authStatus = await authFnt(token ?? '', context);
        if (authStatus) {
            next();
            return;
        }
        next(new NotAuthorizedError(`Bad token`));
        return;
    } catch (err) {
        next(makeError(err));
    }
}
