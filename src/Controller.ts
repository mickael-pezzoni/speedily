import { Router } from 'express';
import { Middleware, RouteOption } from './types';
import { Delete, Get, Patch, Post, Put, Route } from './Route';
import Logger from './utils/Logger';
import Server from './Server';

export class Controller<Entity, CreateDto, UpdateDto> {
    private readonly routes: Route[] = [];
    private readonly server: Server;
    private readonly router: Router;
    private readonly endPoint: string;
    constructor(endPoint: string, server: Server) {
        this.endPoint = endPoint;
        this.server = server;
        this.router = Router();
        this.server.express.use(this.endPoint, this.router);
        Logger.debug(`Create controller : {${this.endPoint}}`);
    }

    private addRoute(route: Route): Controller<Entity, CreateDto, UpdateDto> {
        Logger.debug(
            `Mapping routes : ${route.constructor.name} - {${this.endPoint}${route.endPoint}}`
        );
        this.routes.push(route);
        return this;
    }

    addMiddleware(
        middleware: Middleware
    ): Controller<Entity, CreateDto, UpdateDto> {
        this.router.use(middleware);
        return this;
    }

    get(
        endPoint: string,
        requestHandle: Middleware,
        routeOptions?: RouteOption
    ): Controller<Entity, CreateDto, UpdateDto> {
        const middlewares = routeOptions?.middlewares ?? [];

        this.router.get(endPoint, ...middlewares, requestHandle);
        const route = new Get(endPoint);
        this.addRoute(route);

        return this;
    }

    post(
        endPoint: string,
        requestHandle: Middleware,
        routeOptions?: RouteOption
    ): Controller<Entity, CreateDto, UpdateDto> {
        const middlewares = routeOptions?.middlewares ?? [];
        this.router.post(endPoint, ...middlewares, requestHandle);

        const route = new Post(endPoint);
        this.addRoute(route);

        return this;
    }

    put(
        endPoint: string,
        requestHandle: Middleware,
        routeOptions?: RouteOption
    ): Controller<Entity, CreateDto, UpdateDto> {
        const middlewares = routeOptions?.middlewares ?? [];
        this.router.put(endPoint, ...middlewares, requestHandle);
        const route = new Put(endPoint);
        this.addRoute(route);

        return this;
    }

    patch(
        endPoint: string,
        requestHandle: Middleware,
        routeOptions?: RouteOption
    ): Controller<Entity, CreateDto, UpdateDto> {
        const middlewares = routeOptions?.middlewares ?? [];
        this.router.patch(endPoint, ...middlewares, requestHandle);
        const route = new Patch(endPoint);
        this.addRoute(route);

        return this;
    }

    delete(
        endPoint: string,
        requestHandle: Middleware,
        routeOptions?: RouteOption
    ): Controller<Entity, CreateDto, UpdateDto> {
        const middlewares = routeOptions?.middlewares ?? [];

        this.router.delete(endPoint, ...middlewares, requestHandle);
        const route = new Delete(endPoint);
        this.addRoute(route);

        return this;
    }
}
