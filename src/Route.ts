export abstract class Route {
    private readonly _endPoint: string;
    constructor(endPoint: string) {
        this._endPoint = endPoint;
    }

    get endPoint(): string {
        return this._endPoint;
    }
}

export class Get extends Route {
    constructor(endPoint: string) {
        super(endPoint);
    }
}

export class Post extends Route {
    constructor(endPoint: string) {
        super(endPoint);
    }
}

export class Put extends Route {
    constructor(endPoint: string) {
        super(endPoint);
    }
}

export class Patch extends Route {
    constructor(endPoint: string) {
        super(endPoint);
    }
}

export class Delete extends Route {
    constructor(endPoint: string) {
        super(endPoint);
    }
}
