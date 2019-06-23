const path = require('path')
const program = require('commander')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


program
    .option('--progress')
    .option('--watch')
    .option('--config')
    .option('--env <env>')
    .parse(process.argv)

const isDev = program.env == 'dev' ? true : false
console.log(process.env.PORT)
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash:8].js'
    },
    module: {
        rules: []
    },
    devServer: {
        open: true
    },
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'cheap-module-eval-source-map' : '',
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
        cacheGroups: {
            vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
            }
        }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            config: {title: 'html-webpack-plugin'},
            template: './template/index.html', // 模板注入功能
        }),
        new webpack.ProvidePlugin({
            _: 'lodash',
        }),
        // 定义全局环境变量
        new webpack.DefinePlugin({
            'ENVVIROMENT': isDev ? JSON.stringify('devploment') : JSON.stringify('production')
        })
    ],
}