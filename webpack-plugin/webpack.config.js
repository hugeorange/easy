const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

let timestamp = new Date() - 0
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist/' + timestamp),
    },
    module: {
        rules: []
    },
    devtool: 'inline-source-map',
    mode: 'development',
    target: 'node',
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