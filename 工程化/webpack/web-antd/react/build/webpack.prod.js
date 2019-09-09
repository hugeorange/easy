const path = require('path');
const merge = require("webpack-merge");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');  // 抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象

const common = require("./webpack.config");
const webpack = require("webpack");

module.exports = merge(common, {
    plugins: [
        new CleanWebpackPlugin(
            ['dist/*'],　 //匹配删除的文件
            {
                root: path.join(__dirname, '../'),      //根目录
                verbose: true,        　　　　　　　　　　//开启在控制台输出信息
                dry: false        　　　　　　　　　　//启用删除文件
            }
        ),
        new ExtractTextPlugin("[name]_[chunkhash:8].css"),    //单独使用style标签加载css并设置其路径
        new UglifyJSPlugin(),   // 同webpack自带的 Uglifyjs 配置不同
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')  // 用于处理某些library对开发环境和生产环境做不同的处理
        }),
        new webpack.HashedModuleIdsPlugin(), // 充分利用hash缓存，没起作用
    ],
    module: {
        rules: [
            {
                test: /\.css$/, // 正则表达式，对应的文件交由下面的use处理
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',  // 编译后用什么loader来提取css文件
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }, 
                        'postcss-loader'
                    ]
                    // use: ['css-loader', 'postcss-loader'], 因为postCss 的 css-nano插件压缩会报警告重复的autoPrefixer，所以利用webpack自身插件压缩css
                    // http://blog.csdn.net/academia_zhen/article/details/74302453, 先解析postcss-loader，在解析css-loader
                })
            }
        ]
    }
})