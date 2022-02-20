import { Request, Response, NextFunction } from 'express';
import { BodyRequestFunction, RequestFunction } from 'src/types';
import { makeError } from './error.util';

export async function execRequestFunction(
    req: Request,
    res: Response,
    next: NextFunction,
    requestFunction: RequestFunction | BodyRequestFunction
): Promise<void> {
    try {
        const results = await (isBodyRequestFunction(requestFunction)
            ? requestFunction(req.params, req.body, req.query)
            : (requestFunction as RequestFunction)(req.params, req.query));

        res.send(results);
    } catch (err) {
        next(makeError(err));
    }
}

function isBodyRequestFunction(
    requestFunction: RequestFunction | BodyRequestFunction
): requestFunction is BodyRequestFunction {
    return requestFunction.length > 2;
}
