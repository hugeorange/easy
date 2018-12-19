const path = require('path');
const merge = require("webpack-merge");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require("./webpack.config");
const webpack = require("webpack");

module.exports = merge(common, {
    devtool: 'soucrce-map',
    output: {
        filename: '[name].[chunkhash].bundle.js',
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true  // 避免在生产环境使用 inline-*** 和 eval—*** 
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')  // 用于处理某些library对开发环境和生产环境做不同的处理
        }),
        new webpack.HashedModuleIdsPlugin(),        
    ]
})