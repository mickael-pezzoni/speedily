import { RouteOption } from './types';
import { Request, Response } from 'express';
import { Controller } from './Controller';
// export * from './Server.ts';
import Server from './Server';

const server = new Server(3000);

interface Product {
    id: number;
    name: string;
}

const products: Product[] = [
    { id: 1, name: 'product_1' },
    { id: 2, name: 'product_2' },
    { id: 3, name: 'product_3' },
];

const productsOptions: RouteOption = {
    middlewares: [],
};

new Controller('/auth', server).post('/signin', signin).post('/signup', signup);

new Controller('/products', server)
    .get('/', getProducts, productsOptions)
    .get('/:id', getProduct, productsOptions);

function getProducts(_req: Request, res: Response): void {
    res.json(products);
}
function getProduct(req: Request, res: Response): void {
    const { id } = req.params;
    res.json(products.find((p) => p.id === +(id as string)));
}

function signin(_req: Request, res: Response): void {
    res.send('SIgnin');
}

function signup(_req: Request, res: Response): void {
    res.send('Signup');
}
server.run();
