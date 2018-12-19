const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');  // 抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
const webpack = require("webpack");

/**
 * loader 和你的 import xxx 不是一个东西。
   loader实际上是webpack本身会去调用或者应用的函数而已，
   本质上，webpack 调用loader的方法是 loader-runner 
   也就是说，当你在webpack中配置了loader之后，它自身会在需要的地方加载你的loader，
   加载的方式就是：https://doc.webpack-china.org/api/loaders/
 */

module.exports = {
    entry: {
        app: './app.js',
        // vendor: ['lodash'] ，由于使用 miniChunks会为我们自动处理
    },
    output: {
        path: path.join(__dirname, '../', 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(
            ['dist/*'],　 //匹配删除的文件
            {
                root: path.join(__dirname, '../'),      //根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        ),
        new ExtractTextPlugin("[name].[chunkhash].css"),    //单独使用style标签加载css并设置其路径
        // HtmlWebpackPlugin https://segmentfault.com/a/1190000007294861
        new HtmlWebpackPlugin({
            favicon: path.join(__dirname, '../common/favicon.ico'),
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/, // 正则表达式，对应的文件交由下面的use处理
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',  // 编译后用什么loader来提取css文件
                    use: ['css-loader', 'postcss-loader']
                    // http://blog.csdn.net/academia_zhen/article/details/74302453, 先解析postcss-loader，在解析css-loader
                })
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
            },
            {
                test: /\.js$/,    
                exclude: /node_modules/,    
                loader: 'babel-loader'   
            }
        ]
    }
}