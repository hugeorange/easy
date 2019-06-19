1. 安装： `npm install webpack webpack-cli`
2. 起步： `npm scripts` --> `build: webpack`
3. 管理资源：
   输入 `entry`
   输出 `output`
   css  `style-loader、css-loader`
   图片、字体  `file-loader`
   json：json-loader 已内置
4. 管理输出：
    自动生成 dist/index.html 并引入 bundle  `HtmlWebpackPlugin`
    模板注入功能
    清理dist `clean-webpack-plugin`
   


- 基本配置表
```
// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

modules.export = {
    entry: '',
    output: {
        path: path.resolve(__dirname, 'dist')
        filename: 'main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: !IS_DEV ? '../index.html' : 'index.html',
            config: appconfig,
            template: './views/index.html', // 默认使用 lodash-loader  lodash-template
        }),
    ],
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']},
            // {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
            {
                test: /\.(png|svg|jpg|gif)$/, 
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '1024'
                        }
                    }
                ]
            }
        ]
    }
}
```

- other 
```
// 字体处理后的引入
@font-face {
  font-family: 'MyFont';
  src:  url('./my-font.woff2') format('woff2'),
        url('./my-font.woff') format('woff');
  font-weight: 600;
  font-style: normal;
}

// 处理图片字体的 url 与 file-loader 的区别
file-loader: 返回的是图片的 url
url-loader：
    可以通过 limit 属性对图片分情况处理
    当图片小于 limit(byte)时，转成 base64，大于 limit 调用 file-loader 对图片进行处理
    只会编译 html 和 css 中的图片，如要在js中处理，需将图片 import 相应的 js 文件
    options: limit、name: [name].[ext]、outputPath: 输出位置、publicPath：路径前缀，如要放置在 cdn 上

相同点：都是在webpack中处理图片、字体等文件
关系： url 封装了 file ，但不依赖 file
```
```
html-webpack-plugin


将 entry 配置的相关入口chunk  和  extract-text-webpack-plugin 抽取的css样式   
插入到该插件提供的template配置项指定的内容基础上生成一个html文件（或自动生成一个默认的 html 文件），
具体插入方式是将样式 link 插入到 head 元素中，script 插入到 head 或者 body 中。

options：
title
filename
template：默认是 loadsh template，也可以加载自定义的 模板引擎loader 如：ejs，pug
meta 
chunks         允许注入的 chunk
excludeChunks  不允许注入的 chunk
```