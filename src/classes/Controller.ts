import { Router } from 'express';
import { BodyRequestFunction, RequestFunction, Middleware } from '../types';
import { Delete, Get, Patch, Post, Put, Route } from './Route';
import Logger from '../utils/Logger.util';

/**
 *
 *
 * @export
 * @class Controller
 * @template Entity
 * @template CreateDto
 * @template UpdateDto
 */
export class Controller<Entity, CreateDto, UpdateDto> {
    private readonly routes: Route[] = [];
    readonly router: Router;
    readonly endPoint: string;
    constructor(endPoint: string) {
        this.endPoint = endPoint;
        this.router = Router();
        Logger.debug(`Create controller : {${this.endPoint}}`);
    }

    /**
     *
     *
     * @param {Route} route
     * @return {*}  {Controller<Entity, CreateDto, UpdateDto>}
     * @memberof Controller
     */
    addRoute(route: Route): Controller<Entity, CreateDto, UpdateDto> {
        route.registerOn(this.router);
        Logger.debug(
            `Mapping route : ${route.constructor.name} - {${this.endPoint}${route.endPoint}}`
        );
        this.routes.push(route);
        return this;
    }

    /**
     *
     *
     * @param {Middleware} middleware
     * @return {*}  {Controller<Entity, CreateDto, UpdateDto>}
     * @memberof Controller
     */
    addMiddleware(
        middleware: Middleware
    ): Controller<Entity, CreateDto, UpdateDto> {
        this.router.use(middleware);
        return this;
    }

    /**
     *
     *
     * @param {string} endPoint
     * @param {RequestFunction} requestFunction
     * @param {...Middleware[]} middlewares
     * @return {*}  {Controller<Entity, CreateDto, UpdateDto>}
     * @memberof Controller
     */
    get(
        endPoint: string,
        requestFunction: RequestFunction,
        ...middlewares: Middleware[]
    ): Controller<Entity, CreateDto, UpdateDto> {
        const route = new Get(endPoint, requestFunction, ...middlewares);
        this.addRoute(route);

        return this;
    }

    /**
     *
     *
     * @param {string} endPoint
     * @param {BodyRequestFunction} requestFunction
     * @param {...Middleware[]} middlewares
     * @return {*}  {Controller<Entity, CreateDto, UpdateDto>}
     * @memberof Controller
     */
    post(
        endPoint: string,
        requestFunction: BodyRequestFunction,
        ...middlewares: Middleware[]
    ): Controller<Entity, CreateDto, UpdateDto> {
        const route = new Post(endPoint, requestFunction, ...middlewares);
        this.addRoute(route);

        return this;
    }

    /**
     *
     *
     * @param {string} endPoint
     * @param {BodyRequestFunction} requestFunction
     * @param {...Middleware[]} middlewares
     * @return {*}  {Controller<Entity, CreateDto, UpdateDto>}
     * @memberof Controller
     */
    put(
        endPoint: string,
        requestFunction: BodyRequestFunction,
        ...middlewares: Middleware[]
    ): Controller<Entity, CreateDto, UpdateDto> {
        const route = new Put(endPoint, requestFunction, ...middlewares);
        this.addRoute(route);

        return this;
    }

    /**
     *
     *
     * @param {string} endPoint
     * @param {BodyRequestFunction} requestFunction
     * @param {...Middleware[]} middlewares
     * @return {*}  {Controller<Entity, CreateDto, UpdateDto>}
     * @memberof Controller
     */
    patch(
        endPoint: string,
        requestFunction: BodyRequestFunction,
        ...middlewares: Middleware[]
    ): Controller<Entity, CreateDto, UpdateDto> {
        const route = new Patch(endPoint, requestFunction, ...middlewares);
        this.addRoute(route);

        return this;
    }

    /**
     *
     *
     * @param {string} endPoint
     * @param {RequestFunction} requestFunction
     * @param {...Middleware[]} middlewares
     * @return {*}  {Controller<Entity, CreateDto, UpdateDto>}
     * @memberof Controller
     */
    delete(
        endPoint: string,
        requestFunction: RequestFunction,
        ...middlewares: Middleware[]
    ): Controller<Entity, CreateDto, UpdateDto> {
        const route = new Delete(endPoint, requestFunction, ...middlewares);
        this.addRoute(route);

        return this;
    }
}
