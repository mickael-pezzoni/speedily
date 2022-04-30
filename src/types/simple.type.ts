export type RouteParams = Record<string, string>;
export type QueryParams = Record<string, unknown>;
export type RequestBody = Record<string, unknown>;

export type ClassValidator = new () => object;
export type RouteData = Record<PropertyKey, unknown>;
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type FullEntity<T> = {
    [key in keyof T]-?: T[key];
};
