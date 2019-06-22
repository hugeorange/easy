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

6. 模块热替换
   - 启用 HMR 更新 devServer 的配置，然后使用内置的 HMR 插件

7. treeShanking

8. 生产环境

9. 代码分离：

10. 懒加载 `import()`

11. 缓存

12. 创建 library

13. shim 预置全局变量

14. 渐进式网络应用程序

15. 使用 typescript

16. 环境变量

17. 构建性能

- 基本配置表
```
// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');



modules.export = {
    entry: '',
    output: {
        path: path.resolve(__dirname, 'dist')
        filename: 'main.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    mode: 'devploment',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            config: appconfig,
            template: './views/index.html', // 默认使用 lodash-loader  lodash-template
        }),
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery'
        }),
        new webpack.HotModuleReplacementPlugin()
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

4. HMR 
   devServer 更新
   webpack.HotModuleReplacementPlugin

   react 项目： React Hot Loader
   vue 项目：Vue loader

5. tree-shanking
   - 术语：用于描述 JavaScript 上下文中的未引用代码（dead-code）。
   - 依赖于 ES2015 模块语法的 静态 结构特性，例如：import 和 export，这个术语是由 ES2015 模块打包工具 rollup 普及起来的
   - webpack2 正式支持
   - webpack4 扩展了此能力，通过 package.json 的 sideEffects 属性作为标记，向 compiler 提供提示，
     表明项目中哪些文件是 pure（纯的ES2015模块），由此可以安全地删除未使用的部分

  将文件标记为 side-effect-free (无副作用)

  treeshanking 必须注意以下
  使用 ES2015 模块语法 import export 
  确保没有 compiler 将 ES2015 模块语法转换为 commonjs 模块（@babel/present-env 的默认行为）
  在项目 package.json 文件中 添加一个 sideEffects 属性
  通过将 mode 选项设置为 production，启用 minification（代码压缩）和 tree shanking
```
- 生产环境
```
开发环境：强大的 source map、live reloading HMR
生产环境：压缩 bundle，轻量的 source map、资源优化

两份 webpack 配置，通过 webpack-merge 将两份配置和 common 合并

npm scripts 分为 dev， build

生产环境：source-map
开发环境：inline-source-map
```
- 代码分离：
```
代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载活并行加载这些文件
代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间

常用代码分离有三种：
入口起点：使用 entry 配置 手动分离代码
防止重复：使用 splitChunksPlugin 去重和分离 chunk
optimization: {
    splitChunks: {
        chunks: 'all'
    }
}
对代码分离很有帮助的 plugin 和 loader：
mini-css-extract-plugin
bundle-loader
promise-loader

动态导入：通过模块中的内联函数调用分离代码
import() 语法
require.ensure
```
- 缓存
```
如何确保 webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件

输出文件的文件名[output filename]：

filename: '[name].[contenthash].js'
[contenthash]将根据资源内容创建出唯一 hash，当资源内容发生变化时，[contenthash] 也会发生变化

为文件加入指纹： hash chunkhash contenthash
hash：代表的是 complilation 的 hash 值
chunkhash：代表的是 chunk 的hash值，根据模块内容计算出 hash 值

compililation：对象代表某个版本的资源对应的编译过程。
               该对象包含当前模块资源、待编译文件、有改动的文件和监听依赖的所有信息
compiler对象代表的是配置完备的 webpack 环境，compiler 对象只在 webpack启动时构建一次，由webpack组合所有的配置项构建生成

简单地讲，compiler 对象代表的是不变的 webpack 环境，是针对 webpack 的，
而 compilation 对象针对的是随时可变的项目文件，只要文件有改动，compilation 就会被重新创建

compilation在项目中任何一个文件改动后就会被重新创建，然后 webpack计算新的 compilation的hash值，

hash 是 compilation 对象计算所得，而不是具体项目文件所得。
可以理解为项目总体文件的 hash 值
build 之后的所有文件名后缀hash都会相同，会导致 浏览器缓存失效，没有精准替换修改文件

chunkhash：根据具体模块文件的内容计算所得的 hash 值，所以某个文件的改动只会影响它本身的 hash指纹，不会影响其他文件
缺点：由于webpack将style也视为js的一部分，所以在计算 chunkhash 时会把所有的 js 代码和style代码混合在一起计算，所以 不管 js 和 css 改变都会影响 chunkhash

contenthash： 编译输出的 js 、css 都有各自独立的 hash 指纹

提取引导模板
通过 splitChunks.cacheGroups.vendor , 将依赖设置为长效缓存
将 react、lodash 提取到单独的 vendor chunk 中，下次构建时，其hash 值就不会变

NamedModulesPlugin
HashedModuleIdsPlugin, -- 推荐生产环境使用 - 始终保证 vendor 构建始终相同

```
- 创建 library
```
自己开发一个 library
```

- shim 预置全局变量
```
如果想在 全局使用 lodash、jquery
使用 ProvidePlugin 后，能够在 webpack 编译的每个模块中，通过访问一个变量来获取 package

plugins: [
    new webpack.ProvidePlugin({
        _: 'lodash',
        $: 'jquery'
    })
]

加载 polyfill

入口文件处： import babel-polyfiill
我们没有将 import 绑定到某个变量，这是因为 polyfill 直接基于自身执行，并且是在基础代码执行之前，
这样通过这些预置，我们就可以假定已经具有某些原生功能

babel-present-env package 通过 browserlist 来转义那些浏览器不支持的特性
这个 present 使用 useBuiltins 选项，默认值是 false

shim: 将一个新的 api 引入到一个旧的环境中，而且仅靠就环境中的手段实现
polyfill：弥补旧环境中 api 的缺失
```

- 渐进式网络应用程序
```
渐进式网络应用程序 PWA
离线web应用
通过 service worker 的web技术实现

添加 workbox 
npm install workbox-webpack-plugin
生成 precache-manifest.hash.js, service-worker.js

注册 service worker

if ('serviceWorker' in navigator) {
    // 在 window 上注册 serviceWorker
}
```

- 使用 typescript
```
安装 ts ts-loader

增加 tsconfig.json
```
- 环境变量
```
webpack 命令行 环境配置 的 --env 参数，可以允许你传入任意数量的环境变量
在 webpack.config.js 中可以访问到这些环境变量。
如：--env.production   --env.NODE_ENV=local


通过 env 获取 命令行参数方法
1. 将 webpack.config.js 改写成函数式 
modules.export = env => {
    console.log(env)
    return {
        ...
    }
}

2. 使用 commander 库，获取命令行参数

```
- 构建性能
```
对最少量的模块使用 loader。不应该如下
rules: [{test: /.js$/, loader: 'babel-loader'}]

应该这样 
rules: [{test: /.js$/, loader: 'babel-loader', include: Path.resolve(__dirname, 'src')}]
```











** 之后，思考，你在项目做了 webpack 哪些优化，把标准答案写在这里 **


