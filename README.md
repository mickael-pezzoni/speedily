<h1 align="center">Welcome to speedily 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://mickael-pezzoni.github.io/speedily/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/mickael-pezzoni/turbo/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/mickael-pezzoni/turbo/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/mickael-pezzoni/speedily" />
  </a>
</p>

> Speedily allows you to quickly create an express server with minimal code

## Install

```sh
npm install speedily
```

## Usage

```ts
import { Server, Controller } from "speedily";

const server = new Server(3000);

const homeController = new Controller("/home").get("/", () => {
  return "Home";
});

server.run();

```

## Author

👤 **Mickael Pezzoni**

* Github: [@mickael-pezzoni](https://github.com/mickael-pezzoni)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mickael-pezzoni/speedily/issues). You can also take a look at the [contributing guide](https://github.com/mickael-pezzoni/turbo/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Mickael Pezzoni](https://github.com/mickael-pezzoni).<br />
This project is [ISC](https://github.com/mickael-pezzoni/turbo/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_