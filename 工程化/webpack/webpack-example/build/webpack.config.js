const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require("webpack");

/**
 * loader 和你的 import xxx 不是一个东西。
   loader实际上是webpack本身会去调用或者应用的函数而已，
   本质上，webpack 调用loader的方法是 loader-runner 
   也就是说，当你在webpack中配置了loader之后，它自身会在需要的地方加载你的loader，
   加载的方式就是：https://doc.webpack-china.org/api/loaders/
 */
console.log(path.resolve(__dirname, 'src'));
module.exports = {
    entry: {
        app: './src/index.js',
        // vendor: ['lodash'] ，由于使用 miniChunks会为我们自动处理
    },
    output: {
        path: path.join(__dirname, '../', 'dist'), // 出口地址
        chunkFilename: "[name].[hash].js", // import 动态加载的模块名
        filename: '[name].bundle.js', // 打包后的模块名
    },
    resolve: {
        // extensions: [".js", ".css"] // import 引入时可以不带文件扩展名，貌似不写也没关系
        alias: {
            '@': path.resolve(__dirname, '../src'), // 路径别名，引入时用 @ 代替，不用再写相对路径了
        }
    },
    plugins: [
        // HtmlWebpackPlugin https://segmentfault.com/a/1190000007294861
        new HtmlWebpackPlugin({
            favicon: path.join(__dirname, '../src/favicon.ico'),
            template: path.join(__dirname, '../index.html')
        }),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
            // any required modules inside node_modules are extracted to vendor
            return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                path.join(__dirname, '../node_modules')
                ) === 0
            )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     chunks: ['vendor']
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, 
                use: ['babel-loader']  
            }
        ]
    }
}