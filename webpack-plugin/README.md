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
5. 配置一个开发环境
    `mode: development` 
    生产环境：`devtool: cheap-source-map`
    开发环境：`devtool: 'inline-source-map'`
    代码变动后自动编译代码：`webpack-dev-server`

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
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
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

思考：其实打包成多页应用不如：打包出多份代码，动态设置 entry（可根据 npm scripts 传入的不同参数），
     这样本地开发时，就可以指启动相应的文件，优化了开发环境
     发布时速度也变的更快
     缺点：有可能需要起多个服务当涉及到修改公共位置代码时，需要部署多个服务上
```

- 开发环境
```
为了更容易地追踪 error 和 warning，JavaScript 提供了 source map 功能，可以将编译后的代码映射回原始源代码。
如果一个错误来自于 b.js，source map 就会明确的告诉你。

代码变动后自动编译代码：
1. webpack watch mode(webpack 观察模式) 使用： webpack --watch
2. webpack-dev-server
   提供了一个小型的 web server ，可以实时重载 (living reloading)
   npm install --save-dev webpack-dev-server

   devServer {
       contentBase: './dist', // 默认 false
       publicPath: '/', // 优先级更高
   }
   以上配置告知 webpack-dev-server，将 dist 目录下的文件 serve 到 localhost:8080 下。
   
   webpack-dev-server 在编译之后不会写入到任何输出文件。
   而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。
   如果你的页面希望在其他不同路径中找到 bundle 文件，则可以通过 dev server 配置中的 publicPath 选项进行修改。

   contentBase 与 publicPath 的区别：
   


3. webpack-dev-middleware


```