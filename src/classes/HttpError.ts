import { ExpressError, HttpResponseCode } from '../types';

/**
 *
 *
 * @export
 * @class HttpError
 * @extends {Error}
 * @implements {ExpressError}
 */
export class HttpError extends Error implements ExpressError {
    throwAt: Date;
    msg: string;
    httpCode: HttpResponseCode | number;

    /**
     * Creates an instance of HttpError.
     * @param {(HttpResponseCode | number)} httpCode
     * @param {string} msg
     * @param {string} [stack]
     * @memberof HttpError
     */
    constructor(
        httpCode: HttpResponseCode | number,
        msg: string,
        stack?: string
    ) {
        super(msg);
        this.msg = msg;
        this.httpCode = httpCode;
        this.stack = stack ?? '';
        this.throwAt = new Date();
        if (httpCode === HttpResponseCode.INTERNAL_ERROR) {
            Error.captureStackTrace(this);
        }
        Object.setPrototypeOf(this, this.constructor.prototype);
    }
}

/**
 *
 *
 * @export
 * @class NotFoundError
 * @extends {HttpError}
 */
export class NotFoundError extends HttpError {
    constructor(message: string) {
        super(HttpResponseCode.NOT_FOUND, message);
    }
}

/**
 *
 *
 * @export
 * @class NotImplementedError
 * @extends {HttpError}
 */
export class NotImplementedError extends HttpError {
    constructor(message: string) {
        super(HttpResponseCode.NOT_IMPLEMENTED_ERROR, message);
    }
}
/**
 *
 *
 * @export
 * @class InternalError
 * @extends {HttpError}
 */
export class InternalError extends HttpError {
    constructor(message: string) {
        super(HttpResponseCode.INTERNAL_ERROR, message);
    }
}

/**
 *
 *
 * @export
 * @class NotAuthorizedError
 * @extends {HttpError}
 */
export class NotAuthorizedError extends HttpError {
    constructor(message: string) {
        super(HttpResponseCode.NOT_AUTHORIZED, message);
    }
}
/**
 *
 *
 * @export
 * @class BadRequestError
 * @extends {HttpError}
 */
export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(HttpResponseCode.BAD_REQUEST, message);
    }
}
