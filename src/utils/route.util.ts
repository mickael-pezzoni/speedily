import { Request, Response, NextFunction } from 'express';
import { BodyRequestFunction, RequestFunction } from 'src/types';
import { makeError } from './error.util';

export async function execRequestFunction(
    req: Request,
    res: Response,
    next: NextFunction,
    requestFunction: RequestFunction | BodyRequestFunction,
    isPostRequest = false
): Promise<void> {
    try {
        const results = await (isBodyRequestFunction(
            requestFunction,
            isPostRequest
        )
            ? requestFunction(req.params, req.body, req.query)
            : (requestFunction as RequestFunction)(req.params, req.query));

        res.send(results);
    } catch (err) {
        next(makeError(err));
    }
}

function isBodyRequestFunction(
    _requestFunction: RequestFunction | BodyRequestFunction,
    isPostRequest: boolean
): _requestFunction is BodyRequestFunction {
    return isPostRequest;
}
