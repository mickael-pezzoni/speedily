import { Request, Response, NextFunction } from 'express';
import { Controller } from './classes/Controller';
import { NotFoundError } from './classes/HttpError';
import { Delete } from './classes/Route';
// export * from './classes/Server';
// export * from './classes/Controller';
// export * from './classes/Route';
// export * from './types';
import { Server } from './classes/Server';

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

const authController = new Controller('/auth')
    .post('/signin', signin)
    .post('/signup', signup);

const productController = new Controller('/products')
    .get('/', getProducts)
    .get('/:id', getProduct);

const controllers = [authController, productController];

productController.addRoute(new Delete('/:id', deleteProduct));
server.setControllers(controllers);

server.run();

function getProducts(_req: Request, res: Response): void {
    res.json(products);
}
function getProduct(req: Request, res: Response): void {
    const { id } = req.params;
    res.json(products.find((p) => p.id === +(id as string)));
}
function deleteProduct(req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params;

    const index = products.findIndex(
        (product) => product.id === +(id as string)
    );

    if (index === -1) {
        next(new NotFoundError('Product not found'));
        return;
    }
    products.splice(index, 1);
    res.send('Product deleted');
}
function signin(_req: Request, res: Response): void {
    res.send('SIgnin');
}

function signup(_req: Request, res: Response): void {
    res.send('Signup');
}
