# api-client-react

Small library to simplify the connection with api in React.
------

[![NPM dependencies][npm-dependencies-image]][npm-dependencies-url] 
[![license][license-image]][license-url] [![NPM downloads][npm-downloads-image]][npm-downloads-url] [![code style: prettier](https://badgen.net/badge/code%20style/prettier/green)](https://github.com/prettier/prettier) 
[![Last commit][last-commit-image]][last-commit-url] [![PRs welcome][pr-image]][code-style-image] ![minzipped size][minzip-url]

With a simple **higher**-**order** component (HOC), you can get:
1.  The following props for section: `{ loading, error, data, complete }`
2.  The following prop: `apiClient`, with which you can interact with API.
* Note: Each API call is stored in a section

------

## Examples
- [Simple example: API from params](https://codesandbox.io/s/j4rj8wl709)
- [Simple example: API from methods](https://codesandbox.io/s/0pyvjpk62l)
- [Advanced example](https://codesandbox.io/s/wq9rk5oo8l)

## Getting Started

### Installation
You can install with [NPM][npm-global-url]: [api-client-react][npm-package-url]
```js
npm i --save api-client-react
```

### Create your component and connect
```jsx
import { connectApiClient } from "api-client-react";

const ExampleconnectApiClientComponent = ({ users }) => {
  if (users.loading) {
    return <p>loading</p>;
  }

  if (users.error) {
    return <p>Error</p>;
  }

  if (users.data) {
    return (
      <ol>
        {users.data.map(b => (
          <li key={b.name}>{b.name}</li>
        ))}
      </ol>
    );
  }
}


const config = {
  apiConfig: { // Same object: https://github.com/axios/axios#axios-api
    method: "get",
    url: "https://jsonplaceholder.typicode.com/users"
  },
  section: "users" // Reference section
};

const componentSections = ["users"];

export const ExampleconnectApiClient = connectApiClient(componentSections, config)(ExampleconnectApiClientComponent);
```
NOTE: If you want to make the call in a method, it is also possible: View codesandbox.
Note: Important to send properties `apiConfig` and `section` in config property.

### Doc
#### Functions
| function (render props) | params | description |
|--|--|--|
| `apiClient.fetch( apiConfigObject, "sectionExample" )` | apiConfigObject: Same object: https://github.com/axios/axios#axios-api | Execute axios fetch with the configuration provided And associate the response to your section |

#### Render props
You will receive a props for each section that is an object composed of:

| prop | types | default value | description |
|--|--|--|--|
| `error` | `error` | `false` | Api error |
| `data` | `result` |  | Data response |
| `loading` | `boolean` | `false`| Only `true` during call response period. |
| `complete` | `boolean` | `false`| Only `true` when api call is finished. |


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
