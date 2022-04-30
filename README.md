<h1 align="center">Welcome to speedily-js 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.7-blue.svg?cacheSeconds=2592000" />
  <a href="https://mickael-pezzoni.github.io/speedily-js/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/mickael-pezzoni/speedily-js/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/mickael-pezzoni/speedily-js/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/mickael-pezzoni/  speedily-js" />
  </a>
</p>

> **speedily-js** allows you to quickly create an express server with minimal code

-   [Install](#install)
-   [Usage](#usage)
    -   [Simple](#simple)
    -   [Using the parameters](#using-the-parameters)
    -   [Post data](#post-data)
    -   [Throw an error](#throw-an-error)
    -   [Authenticate your controllers](#authenticate-your-controllers)
    -   [Authenticate a specific route](#authenticate-a-specific-route)
-   [Author](#author)
-   [🤝 Contributing](#-contributing)
-   [Show your support](#show-your-support)
-   [📝 License](#-license)

## Install

```sh
npm install speedily-js
```

## Usage

### Simple

```ts
import { Server, Controller } from 'speedily-js';

const server = new Server(3000);

const homeController = new Controller('/home').get('/', () => {
    return 'Home';
});

server.setControllers([homeController]);

server.run();
```

### Using the parameters

> `getOrFail` automatically throws a 400 error if the parameter could not be found

```ts
const productController = new Controller('/products')
    .get('/', (context: Context) =>
        productService.findAll([], context.queryParams.get('categoryId'))
    )
    .get('/:id', (context: Context) =>
        productService.findOne(context.params.getOrFail<number>('id'))
    );
```

### Post data

> You can use class-validator to check your dto.

```ts
class CreateProductDto {
    @IsString()
    @Length(4)
    name!: string;

    @IsString()
    @IsOptional()
    description!: string;

    @IsNumber()
    quantity!: number;

    @IsNumber()
    categoryId!: number;
}

const productController = new Controller('/products').post(
    '/',
    (context: Context) =>
        productService.create(context.body.get<CreateProductDto>()),
    { bodyValidator: CreateProductDto }
);
```

### Throw an error

>

```ts
const productController = new Controller('/products').post(
    '/',
    (context: Context) => {
        throw new BadRequestError(`Why not`);
    }
);
```

> You can also create your own errors

```ts
export class CustomError extends HttpError {
    constructor(message: string) {
        super(418, message);
    }
}
const productController = new Controller('/products').get(
    '/',
    (context: Context) => {
        throw new CustomError(`Why not`);
        // or
        throw new HttpError(418, 'Why not');
    }
);
```

### Authenticate your controllers

```ts
function auth(jwt: string, context: Context): Promise<boolean> {
    try {
        verify(jwt, environnement.API_SECRET_JWT);
    } catch (err) {
        return false;
    }
    return true;
}

const productController = new Controller('/products')
  .enableBearerAuth(auth)
...

```

### Authenticate a specific route

> You can also pass data to your routes and access them with `context.data`

```ts
const productController = new Controller('/products').get(
    '/:id',
    (context: Context) =>
        productService.findOne(context.params.getOrFail<number>('id')),
    {
        bearerAuthFnt: auth,
        data: {
            roles: ['admin', 'manager'],
        },
    }
);
```

A more complete example [here](https://github.com/mickael-pezzoni/stock-api)

## Author

👤 **Mickael Pezzoni**

-   Github: [@mickael-pezzoni](https://github.com/mickael-pezzoni)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mickael-pezzoni/ speedily-js/issues). You can also take a look at the [contributing guide](https://github.com/mickael-pezzoni/speedily-js/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Mickael Pezzoni](https://github.com/mickael-pezzoni).<br />
This project is [ISC](https://github.com/mickael-pezzoni/speedily-js/blob/master/LICENSE) licensed.
