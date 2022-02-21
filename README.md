<h1 align="center">Welcome to speedily-js 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.3-blue.svg?cacheSeconds=2592000" />
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

## Install

```sh
npm install speedily-js
```

## Usage

```ts
import { Server, Controller } from "speedily-js";

const server = new Server(3000);

const homeController = new Controller("/home").get("/", () => {
  return "Home";
});

server.setControllers([homeController]);

server.run();

```
A more complete example [here](https://github.com/mickael-pezzoni/example-speedily-js)

## Author

👤 **Mickael Pezzoni**

* Github: [@mickael-pezzoni](https://github.com/mickael-pezzoni)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mickael-pezzoni/  speedily-js/issues). You can also take a look at the [contributing guide](https://github.com/mickael-pezzoni/speedily-js/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Mickael Pezzoni](https://github.com/mickael-pezzoni).<br />
This project is [ISC](https://github.com/mickael-pezzoni/speedily-js/blob/master/LICENSE) licensed.
