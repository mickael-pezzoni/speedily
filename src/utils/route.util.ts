import { Route } from 'classes/Route';
import { NextFunction, Request, Response } from 'express';

import { Context } from '../classes/Context';
import { RequestBody } from '../types/simple.type';
import { makeError } from './error.util';

/**
 *
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @param {Route} route
 * @return {*}  {Promise<void>}
 */
export async function execRequestFunction(
    req: Request,
    res: Response,
    next: NextFunction,
    route: Route
): Promise<void> {
    try {
        const context = new Context(req, route.routeOptions);
        await context.queryParams.validate(
            req.query as Record<PropertyKey, unknown>
        );
        await context.body?.validate(req.body as RequestBody);
        const results = await route.requestFunction(context);
        const responseBody =
            typeof results === 'number' ? results.toString() : results;
        res.send(responseBody);
    } catch (err) {
        next(makeError(err));
    }
}
