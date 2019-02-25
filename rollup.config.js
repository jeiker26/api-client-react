const json = require("rollup-plugin-json");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const nodeBuiltIns = require("rollup-plugin-node-builtins");
const nodeGlobals = require("rollup-plugin-node-globals");
const uglifier = require("rollup-plugin-uglify");

module.exports = {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "umd",
    name: "apiClientReact",
    globals: {
      react: "React",
      axios: "axios",
      "axios-retry": "axiosRetry",
      rxjs: "rxjs",
      "hoist-non-react-statics": "hoistNonReactStatics"
    }
  },
  external: ["react", "hoist-non-react-statics", "axios", "axios-retry", "rxjs"],
  plugins: [
    resolve({
      module: true,
      main: true,
      browser: true,
      jsnext: true,
      preferBuiltins: true
    }),
    commonjs({
      include: "node_modules/**"
    }),
    json(),
    babel(),
    nodeBuiltIns(),
    nodeGlobals(),
    uglifier.uglify()
  ]
};
