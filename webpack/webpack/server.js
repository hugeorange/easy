const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const config = require('./webpack.config');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

// server this files on port 3000
app.listen(3000, function() {
    console.log('example app listening on port 3000!\n');
})