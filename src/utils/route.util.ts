import { Request, Response, NextFunction } from 'express';
import { BodyRequestFunction, RequestFunction } from 'src/types';
import { makeError } from './error.util';

export function execRequestFunction(
    req: Request,
    res: Response,
    next: NextFunction,
    requestFunction: RequestFunction | BodyRequestFunction
): void | Promise<void> {
    try {
        res.send(
            isBodyRequestFunction(requestFunction)
                ? requestFunction(req.params, req.body, req.query)
                : (requestFunction as RequestFunction)(req.params, req.query)
        );
    } catch (err) {
        next(makeError(err));
    }
}

function isBodyRequestFunction(
    requestFunction: RequestFunction | BodyRequestFunction
): requestFunction is BodyRequestFunction {
    return 'body' in requestFunction;
}
