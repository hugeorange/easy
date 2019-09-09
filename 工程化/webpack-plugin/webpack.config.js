const path = require("path");
const program = require("commander");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * npm run dev --params=123 这种情况通过上面获取参数
 * console.log('process--->参数', process.env.npm_config_params)
 *
 * console.log('process--->参数', process.argv)
 * "devs": "webpack --progress --colors --params=123" 获取参数，通过数组形式展示
 */

program
  .option("--progress")
  .option("--colors")
  .option("--watch")
  .option("--config")
  .option("--env <env>")
  .parse(process.argv);

const isDev = program.env == "dev" ? true : false;

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      }
    ]
  },
  devServer: {
    open: true
  },
  mode: isDev ? "development" : "production",
  // devtool: isDev ? "cheap-module-eval-source-map" : "",
//   optimization: {
//     runtimeChunk: "single",
//     splitChunks: {
//       cacheGroups: {
//         vendor: {
//           test: /[\\/]node_modules[\\/]/,
//           name: "vendors",
//           chunks: "all"
//         }
//       }
//     }
//   },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      config: { title: "html-webpack-plugin" },
      template: "./template/index.html" // 模板注入功能
    }),
    new webpack.ProvidePlugin({
      _: "lodash"
    }),
    // 定义全局环境变量
    new webpack.DefinePlugin({
      ENVVIROMENT: isDev
        ? JSON.stringify("devploment")
        : JSON.stringify("production")
    })
  ]
};
