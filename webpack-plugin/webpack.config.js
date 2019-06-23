const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const program = require('commander')

program
    .option('--progress')
    .option('--watch')
    .option('--config')
    .option('--env <env>')
    .parse(process.argv)

const isDev = program.env == 'dev' ? true : false
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

    },
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'inline-source-map' : 'source-map',
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
        new CleanWebpackPlugin({ 
            root: path.resolve(__dirname, 'dist'),
            dry: false // 启用删除文件
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            config: {title: 'html-webpack-plugin'},
            template: './template/index.html', // 模板注入功能
        }),
    ],
}

/**
 * webpack-dev-server  会自动帮我们刷新浏览器，热替换等
 * webpack watch 模式 不会帮我们做上述处理
 */