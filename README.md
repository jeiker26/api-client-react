# api-client-react

Small library to simplify the connection with api in React.
------

[![NPM dependencies][npm-dependencies-image]][npm-dependencies-url] 
[![license][license-image]][license-url] [![NPM downloads][npm-downloads-image]][npm-downloads-url] [![code style: prettier](https://badgen.net/badge/code%20style/prettier/green)](https://github.com/prettier/prettier) 
[![Last commit][last-commit-image]][last-commit-url] [![PRs welcome][pr-image]][code-style-image] ![minzipped size][minzip-url]

With a simple **higher**-**order** component (HOC), you can get:
1.  The following props: `{ loading, error, data }`
2.  The following prop: `apiClient`, with which you can interact with API.

------

## Examples
- [Simple Form: API from params](https://codesandbox.io/s/j4rj8wl709)
- [Simple Form: API from methods](https://codesandbox.io/s/0pyvjpk62l)

## Getting Started

### Installation
You can install with [NPM][npm-global-url]: api-client-react[npm-package-url]
```js
npm i --save api-client-react
```

### Create your component and connect
```jsx
import { connectApiClient } from "api-client-react";

const ExampleconnectApiClientComponent = ({ loading, users, complete, error }) => {
  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  if (users) {
    return (
      <ol>
        {users.map(b => (
          <li key={b.name}>{b.name}</li>
        ))}
      </ol>
    );
  }

  return <strong>{complete}</strong>;
}

// Same object: https://github.com/axios/axios#axios-api
const apiSettings = {
  method: "get",
  url: "https://jsonplaceholder.typicode.com/users"
};

const mapApiProps = ({ loading, data, error }) => ({
  loading,
  users: data,
  error,
  complete: !loading && data && !error ? "true" : "false"
});

export const ExampleconnectApiClient = connectApiClient(apiSettings, mapApiProps)(ExampleconnectApiClientComponent);
```
NOTE: If you want to make the call in a method, it is also possible: View codesandbox.


### Doc
#### Functions
| function | params | description |
|--|--|--|
| `apiClient.fetch({config})` | Same object: https://github.com/axios/axios#axios-api | Execute axios fetch with the configuration provided |


#### Render props
| prop | types | default value | description |
|--|--|--|--|
| `error` | `{ elementKey: String[], ... }` | `{}` | Api error: 404, 503, ... |
| `data` | `{ element: String, ... }` | `{}` | Data response |
| `loading` | `boolean` | `true`| Only `true` during call response period. |
| `apiClient` | `object` | `{ fetch: function }`| Method that allows you to make the call to api.|


---

MIT License.

---


[npm-global-url]: https://npmjs.com/
[npm-package-url]: https://www.npmjs.com/package/api-client-react
[pr-image]: https://badgen.net/badge/PRs/welcome/green
[minzip-url]: https://badgen.net/bundlephobia/minzip/api-client-react
[code-style-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[license-image]: https://img.shields.io/github/license/jeiker26/api-client-react.svg
[license-url]: https://github.com/jeiker26/api-client-react
[last-commit-image]: https://img.shields.io/github/last-commit/jeiker26/api-client-react.svg
[last-commit-url]: https://github.com/jeiker26/api-client-react/commits

[npm-downloads-image]: https://img.shields.io/npm/dm/api-client-react.svg
[npm-downloads-url]: https://www.npmjs.com/package/api-client-react
[npm-dependencies-image]: https://img.shields.io/david/jeiker26/api-client-react.svg
[npm-dependencies-url]: https://david-dm.org/jeiker26/api-client-react
[release-image]: https://img.shields.io/github/release-date/jeiker26/api-client-react.svg
[release-url]: https://github.com/jeiker26/api-client-react/releases
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
