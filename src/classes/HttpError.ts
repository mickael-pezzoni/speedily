import { ExpressError, HttpResponseCode } from '../types';

export class HttpError extends Error implements ExpressError {
    throwAt: Date;
    msg: string;
    httpCode: HttpResponseCode;

    constructor(httpCode: HttpResponseCode, msg: string, stack?: string) {
        super(msg);
        this.msg = msg;
        this.httpCode = httpCode;
        this.stack = stack ?? '';
        this.throwAt = new Date();
        if (httpCode === HttpResponseCode.INTERNAL_ERROR) {
            Error.captureStackTrace(this);
        }
        Object.setPrototypeOf(this, this.constructor);
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string) {
        super(HttpResponseCode.NOT_FOUND, message);
    }
}

export class NotImplementedError extends HttpError {
    constructor(message: string) {
        super(HttpResponseCode.NOT_IMPLEMENTED_ERROR, message);
    }
}

export class InternalError extends HttpError {
    constructor(message: string) {
        super(HttpResponseCode.INTERNAL_ERROR, message);
    }
}

export class NotAuthorizedError extends HttpError {
    constructor(message: string) {
        super(HttpResponseCode.NOT_AUTHORIZED, message);
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(HttpResponseCode.BAD_REQUEST, message);
    }
}
