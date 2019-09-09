const path = require('path');
const merge = require("webpack-merge");
const common = require("./webpack.config");
const webpack = require("webpack");

module.exports = merge(common, {
    devtool: 'inline-source-map',
    /**
     * webpack-dev-server主要是启动了一个使用express的Http服务器。它的作用主要是用来伺服资源文件。此外这个Http服务器和client使用了websocket通讯协议，原始文件作出改动后，webpack-dev-server会实时的编译，但是最后的编译的文件并没有输出到目标文件夹
     * 你启动webpack-dev-server后，你在目标文件夹中是看不到编译后的文件的,实时编译后的文件都保存到了内存当中。因此很多同学使用webpack-dev-server进行开发的时候都看不到编译后的文件
     * https://segmentfault.com/a/1190000006670084
     * webpack-dev-server 生成的包是存在内存中的
     * http://www.cnblogs.com/xfshen/p/5941127.html
     * https://www.cnblogs.com/caideyipi/articles/7080010.html
     * 两种更新模式：inline、iframe； iframe: 会创建一个iframe然后将应用注入到其中，每次就reload iframe，inline：webpack-dev-server会在你的webpack.config.js的入口配置文件中再添加一个入口,
     * 目的是一样的，监听文件变化，再将编译后的文件推送到前端，实现页面reload
     */
    devServer: {
        // contentBase: "../", // 不填写默认当前目录 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
        // inline: true, // 如果此处设置 npm scripts 也要设置，发现不设置也能达到目的
        hot: true, // 启用 webpack 的模块热替换特性：
        // historyApiFallback: true,
        historyApiFallback:{
            index: '/index.html'
        },
        // hotOnly: true,//关闭热替换 注释掉这行就行，十分重要，，关闭css依旧热替换 ，js并不热替换了
        // stats: 'errors-only',
        host: "0.0.0.0", // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，可以用ip地址访问
        port: process.env.PORT, // 指定要监听请求的端口号
        compress: true, // 一切服务都启用gzip 压缩：
        overlay: {
            // errors: true,
            // warnings: true,
        },
        // proxy: {} // 跨域代理设置
    },
    module: {
        rules: [
            {
                test: /\.(css)$/, // 正则表达式，对应的文件交由下面的use处理
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
})