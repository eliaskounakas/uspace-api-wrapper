## Introduction
This API is designed to make interacting with University of Vienna's platform uspace easier.

## Installation
To use this package, simply run:
```shell
$ npm i uspace-api-wrapper
```
## Usage
Currently you can only login and retrieve your courses. More features are coming soon!\
Make sure not to expose your username/password when using this API!
```js
import UspaceClient from "uspace-api-wrapper"

const uspaceClient = new UspaceClient();

await uspaceClient.login("myUsername", "myPassword");

const myCourses = await uspaceClient.getCourses(2024, false);

console.log(myCourses);
```
