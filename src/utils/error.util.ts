import { HttpError, InternalError } from '../classes/HttpError';

/**
 *
 *
 * @export
 * @param {(HttpError | Error | unknown)} error
 * @return {*}  {HttpError}
 */
export function makeError(error: HttpError | Error | unknown): HttpError {
    if (error instanceof HttpError) {
        return error;
    }
    if (error instanceof Error) {
        return new InternalError(error.message);
    }
    return new InternalError('Unknown error');
}
