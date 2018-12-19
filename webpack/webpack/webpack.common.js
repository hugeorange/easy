const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // entry: './src/index.js',
    entry: {
        app: './src/index.js',
        // print: './src/print.js'
    },
    output: {
        // filename: 'bundle.js',
        filename: '[name].bundle.js',
        // 此处加不加 __dirname 都无所谓，因为 path.resolve 会自动帮你找到应用程序根目录，并拼接到路径上，与join不同，join不会帮你拼接
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', // publicPath 也会在服务器脚本用到，以确保文件资源能够在 localhost:3000 下正确访问
    },
    devtool: 'inline-source-map', // sourcemap 选项
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']), // 每次构建前清理dist目录
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new webpack.NamedChunksPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // 注意，我们添加了 NamedModulesPlugin,以便更容易查看要修补(patch)的依赖
        new UglifyJSPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/, // 正则表达式，对应的文件交由下面的use处理
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};