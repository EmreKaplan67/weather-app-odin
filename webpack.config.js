// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";

  return {
    mode: isDev ? "development" : "production",
    entry: "./src/index.js",
    output: {
      filename: isDev ? "main.js" : "main.[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath: ""
    },
    devtool: isDev ? "eval-source-map" : false,
    devServer: {
      watchFiles: { paths: ["./src/**/*"] },
      hot: true,
      open: true,
      port: 3000
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./src/template.html" }),
      new Dotenv({ path: isDev ? "./.env.development" : "./.env.production" })
    ],
    module: {
      rules: [
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
        { test: /\.html$/i, loader: "html-loader" },
        { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" }
      ]
    }
  };
};
