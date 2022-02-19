import { Router } from 'express';
import { Middleware, RouteOption } from '../types';
import { Delete, Get, Patch, Post, Put, Route } from './Route';
import Logger from '../utils/Logger';

export class Controller<Entity, CreateDto, UpdateDto> {
    private readonly routes: Route[] = [];
    readonly router: Router;
    readonly endPoint: string;
    constructor(endPoint: string) {
        this.endPoint = endPoint;
        this.router = Router();
        Logger.debug(`Create controller : {${this.endPoint}}`);
    }

    addRoute(route: Route): Controller<Entity, CreateDto, UpdateDto> {
        route.registerOn(this.router);
        Logger.debug(
            `Mapping route : ${route.constructor.name} - {${this.endPoint}${route.endPoint}}`
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
        _routeOptions?: RouteOption,
        ...middlewares: Middleware[]
    ): Controller<Entity, CreateDto, UpdateDto> {
        const route = new Get(endPoint, ...middlewares);
        this.addRoute(route);

        return this;
    }

    post(
        endPoint: string,
        _routeOptions?: RouteOption,
        ...middlewares: Middleware[]
    ): Controller<Entity, CreateDto, UpdateDto> {
        const route = new Post(endPoint, ...middlewares);
        this.addRoute(route);

        return this;
    }

    put(
        endPoint: string,
        _routeOptions?: RouteOption,
        ...middlewares: Middleware[]
    ): Controller<Entity, CreateDto, UpdateDto> {
        this.router.put(endPoint, ...middlewares);
        const route = new Put(endPoint);
        this.addRoute(route);

        return this;
    }

    patch(
        endPoint: string,
        _routeOptions?: RouteOption,
        ...middlewares: Middleware[]
    ): Controller<Entity, CreateDto, UpdateDto> {
        this.router.patch(endPoint, ...middlewares);
        const route = new Patch(endPoint);
        this.addRoute(route);

        return this;
    }

    delete(
        endPoint: string,
        _routeOptions?: RouteOption,
        ...middlewares: Middleware[]
    ): Controller<Entity, CreateDto, UpdateDto> {
        this.router.delete(endPoint, ...middlewares);
        const route = new Delete(endPoint);
        this.addRoute(route);

        return this;
    }
}
