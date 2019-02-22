const webpack = require("webpack"); // eslint-disable-line
const path = require("path");

const config = {
  entry: ["babel-polyfill", "./example/index.js"],
  output: {
    path: path.resolve(__dirname, "example/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.join(__dirname, "example/dist"),
    hot: true,
    port: 9000
  }
};
module.exports = config;
