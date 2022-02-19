import { Middleware } from './../types';
import { Router } from 'express';

export abstract class Route {
    private readonly _endPoint: string;
    protected readonly middlewares: Middleware[] = [];
    constructor(endPoint: string, ...middlewares: Middleware[]) {
        this._endPoint = endPoint;
        this.middlewares = middlewares;
    }

    get endPoint(): string {
        return this._endPoint;
    }

    // eslint-disable-next-line no-unused-vars
    abstract registerOn(router: Router): void;
}

export class Get extends Route {
    registerOn(router: Router): void {
        router.get(this.endPoint, ...this.middlewares);
    }
    constructor(endPoint: string, ...middlewares: Middleware[]) {
        super(endPoint, ...middlewares);
    }
}

export class Post extends Route {
    registerOn(router: Router): void {
        router.post(this.endPoint, ...this.middlewares);
    }
    constructor(endPoint: string, ...middlewares: Middleware[]) {
        super(endPoint, ...middlewares);
    }
}

export class Put extends Route {
    registerOn(router: Router): void {
        router.put(this.endPoint, ...this.middlewares);
    }
    constructor(endPoint: string, ...middlewares: Middleware[]) {
        super(endPoint, ...middlewares);
    }
}

export class Patch extends Route {
    registerOn(router: Router): void {
        router.patch(this.endPoint, ...this.middlewares);
    }
    constructor(endPoint: string, ...middlewares: Middleware[]) {
        super(endPoint, ...middlewares);
    }
}

export class Delete extends Route {
    registerOn(router: Router): void {
        router.delete(this.endPoint, ...this.middlewares);
    }
    constructor(endPoint: string, ...middlewares: Middleware[]) {
        super(endPoint, ...middlewares);
    }
}
