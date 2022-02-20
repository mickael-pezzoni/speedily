import { Controller } from './classes/Controller';
import { NotFoundError } from './classes/HttpError';
import { Delete } from './classes/Route';

import { Server } from './classes/Server';
import { Params } from './types';

const server = new Server(3000);

// export * from './classes/Server';
// export * from './classes/Controller';
// export * from './classes/Route';
// export * from './types';
// export * from './utils/error';
// export * from './classes/HttpError';

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
    .post('/signin', () => 'Signin')
    .post('/signup', () => 'Signup');

const productController = new Controller('/products')
    .get('/', () => products)
    .get('/:id', getProduct);

const controllers = [authController, productController];

productController.addRoute(new Delete('/:id', deleteProduct));
server.setControllers(controllers);

server.run();

function getProduct(param: Params): Product {
    const { id } = param;
    const product = products.find((p) => p.id === +(id as string));

    if (product === undefined) {
        throw new NotFoundError('Product not found');
    }
    return product;
}
function deleteProduct(params: Params): string {
    const { id } = params;

    const index = products.findIndex(
        (product) => product.id === +(id as string)
    );

    if (index === -1) {
        throw new NotFoundError('Product not found');
    }
    products.splice(index, 1);

    return 'Product deleted';
}
