# webpack 
## 打包原理
1. 模块化机制：webpack并不强制你使用某种模块化方案，而是通过兼容所有模块化方案让你无痛接入。
## 核心思想
1. 一切皆模块：
2. 按需加载
3. 文件管理：每个文件都是一个资源，可以用 require/import 导；每个入口文件会把自己所依赖的资源全部打包在一起，一个资源多次引用的话，只会打包一份；多个入口可以用 `CommonsChunkPlugin`优化
## 打包原理：把所有依赖打包成一个 bundle.js文件，通过代码分割成单元片段按需加载

- 通过 `import`,要使用此功能必须要安装`babel-plugin-syntax-dynamic-import` 这个插件，并在 babelrc里面进行配置
```
自定义Chunk 名称
这个是webpack 2.4.0新加的"魔力注释"

import(/* webpackChunkName: "my-chunk-name" */ 'module');

import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default;
    print();
});
```

# webpack code Splitting 
-  code Splitting 其实就是把代码分成很多很多块
- 两种实现方式
1. 分离业务代码和第三方库 (饿了么知乎文章)
2. 按需加载（利用 import()）语法 （webpack2.4黑魔法）

### 分离业务代码和第三方库
- [webpack](#webpack)
    - [打包原理](#%E6%89%93%E5%8C%85%E5%8E%9F%E7%90%86)
    - [核心思想](#%E6%A0%B8%E5%BF%83%E6%80%9D%E6%83%B3)
    - [打包原理：把所有依赖打包成一个 bundle.js文件，通过代码分割成单元片段按需加载](#%E6%89%93%E5%8C%85%E5%8E%9F%E7%90%86%EF%BC%9A%E6%8A%8A%E6%89%80%E6%9C%89%E4%BE%9D%E8%B5%96%E6%89%93%E5%8C%85%E6%88%90%E4%B8%80%E4%B8%AA-bundlejs%E6%96%87%E4%BB%B6%EF%BC%8C%E9%80%9A%E8%BF%87%E4%BB%A3%E7%A0%81%E5%88%86%E5%89%B2%E6%88%90%E5%8D%95%E5%85%83%E7%89%87%E6%AE%B5%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)
- [webpack code Splitting](#webpack-code-splitting)
        - [分离业务代码和第三方库](#%E5%88%86%E7%A6%BB%E4%B8%9A%E5%8A%A1%E4%BB%A3%E7%A0%81%E5%92%8C%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%93)
        - [mainfest文件](#mainfest%E6%96%87%E4%BB%B6)
    - [code spliting 研究完毕，会使用，明天研究 webpack配合gulp使用](#code-spliting-%E7%A0%94%E7%A9%B6%E5%AE%8C%E6%AF%95%EF%BC%8C%E4%BC%9A%E4%BD%BF%E7%94%A8%EF%BC%8C%E6%98%8E%E5%A4%A9%E7%A0%94%E7%A9%B6-webpack%E9%85%8D%E5%90%88gulp%E4%BD%BF%E7%94%A8)
- [模块加载方案](#%E6%A8%A1%E5%9D%97%E5%8A%A0%E8%BD%BD%E6%96%B9%E6%A1%88)
- [gulp 配合 webpack （libunengji）](#gulp-%E9%85%8D%E5%90%88-webpack-%EF%BC%88libunengji%EF%BC%89)
        - [为什么使用 webapck-gulp 结合](#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8-webapck-gulp-%E7%BB%93%E5%90%88)
        - [最佳实践](#%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
    88%86%E5%89%B2%E6%88%90%E5%8D%95%E5%85%83%E7%89%87%E6%AE%B5%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)
- [webpack code Splitting](#webpack-code-splitting)
        - [分离业务代码和第三方库](#%E5%88%86%E7%A6%BB%E4%B8%9A%E5%8A%A1%E4%BB%A3%E7%A0%81%E5%92%8C%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%93)
        - [mainfest文件](#mainfest%E6%96%87%E4%BB%B6)
    - [code spliting 研究完毕，会使用，明天研究 webpack配合gulp使用](#code-spliting-%E7%A0%94%E7%A9%B6%E5%AE%8C%E6%AF%95%EF%BC%8C%E4%BC%9A%E4%BD%BF%E7%94%A8%EF%BC%8C%E6%98%8E%E5%A4%A9%E7%A0%94%E7%A9%B6-webpack%E9%85%8D%E5%90%88gulp%E4%BD%BF%E7%94%A8)
```
entry: {
    app: './src/index.js',
    vendor: ['lodash']
},
```
- 这样做完之后，lodash这个库确实被单独打包出来了，可是app.js也打包进了 lodash，这样就得不偿失了
- 其实这是很正常的事情：每个entry都包含了他自己的依赖，这样他才能作为一个独立的入口，独立的跑起来
2. 提取公共模块的话用到 `CommonsChunkPlugin`插件，使用这个插件就能将所有第三方依赖库移动到vendor中
```
plugins: [
    // 在所有的chunk中，找到依赖两次及以上的模块，然后移动到vendor这个chunk中
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
    }),
],
```
3. 当业务越来越大，依赖的第三方库越来越多，每次手动维护 entry，太费神了
4. 自动化分离vendor，如果我们想把所有 node_modules目录下的所有 .js 都自动分离到 vendor.js则需要用到 minChunks


### mainfest文件
webpack manifest文件用来引导所有模块的交互。manifest文件包含了加载和处理模块的逻辑。

当webpack编译器处理和映射应用代码时，它把模块的详细的信息都记录到了manifest文件中。当模块被打包并运输到浏览器上时，runtime就会根据manifest文件来处理和加载模块。利用manifest就知道从哪里去获取模块代码。

## code spliting 研究完毕，会使用，明天研究 webpack配合gulp使用


# 模块加载方案
1. CommonJS 服务端同步加载
2. CMD 浏览器异步加载，延迟加载的方式，等资源用到了才加载   `define(function (require, exports, module) {})`
3. AMD 提前加载的方式，用到的时候资源已经加载完成 `define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {})`
4. UMD 同时支持 AMD 和 CommonJS 的书写风格


# gulp 配合 webpack （libunengji）
0. 综合说明 http://blog.csdn.net/yidboy/article/details/78742585
1. https://www.jianshu.com/p/9724c47b406c （简述文章）
2. https://www.jianshu.com/p/2cc6a22c9ecc
3. http://www.meckodo.com/#!/ （二者） http://meckodo.github.io/myDemo/

webpack与gulp区别
- gulp是工具链、构建工具、可以配合各种插件做js压缩，css压缩，less编译替代手工实现自动化工作
    1. 构建工具
    2. 自动化
    3. 提高效率用

- webpack 是当下最热门的前端资源模块化管理和打包工具，可以把项目的各种js文件、css文件等打包合并成一个或多个文件，主要用于模块化方案，预编译模块的方案
    1. 打包工具
    2. 模块化识别
    3. 编译模块代码方案用

- Gulp侧重于前端开发的整个过程的控制管理（像是流水线），我们可以通过给 gulp 配置不同的 task（通过Gulp中的 gulp.task()方法配置，比如启动 server、sass、less预编译，文件的合并和压缩等等）来让gulp实现不同的功能，从而构建前端开发流程
- webpack有人称之为模块打包机，由此也可以看出webpack更侧重于模块打包，当然我们也可以把开发中的所有资源（图片、js文件、css文件等）都可以看成模块，webpack是通过loader（加载器）和plugins（插件）对资源进行处理的

### 为什么使用 webapck-gulp 结合
- webpack主要以entry文件文件为入口形成的依赖链，对依赖文件的类型，进行监控、loader任务，打包合并、专业处理打包各种规范模块。gulp主要以监听物理目录下文件，执行配置的任务流。

### 最佳实践
- 最佳实践是 gulp负责工作流生命周期里面的样式，雪碧图的合并，2x/3x 多倍图的输入上，webpack负责脚本模块打包合并（组件开发）
- 当然，对react或者vue等类似组件化开发方式，webpack足矣



# 2018-06-10 13:25 带有热模块替换的webpack配置

- 在webpack.dev.js 里面配置如下信息
```
devServer: {
    // contentBase: './dist', // 本地服务器在哪个页面搭建，不填写默认当前目录
    // inline: true, // 如果此处设置 npm scripts 也要设置，发现不设置也能达到目的
    hot: true, // 全局刷新
    historyApiFallback: true,
    hotOnly: true,//关闭热替换 注释掉这行就行，十分重要
    stats: 'errors-only',
    host: process.env.Host,
    port: process.env.PORT,
    overlay: {
        errors: true,
        warnings: true,
    }
},
plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR模式下，控制台打印时，从id换成名字
]
```

- 开发环境通过 webpack-dev-server 启动命令
- 生产环境通过 webpack 启动命令
- dev-server 命令配置，主要用于开发环境

- 使用 `UglifyjsWebpackPlugin` 这个插件使用 UglifyJS 去压缩你的JavaScript代码。除了它从 webpack 中解耦之外，它和 webpack 核心插件 (webpack.optimize.UglifyJSPlugin) 是同一个插件。这允许你控制你正在使用的 UglifyJS 的版本。
- 有了 babel转码为什么还需要 用 `UglifyjsWebpackPlugin` 来压缩es6代码呢

- webpack2以后 利用 webpack 去实现 ES6模块化加载，不用借助babel，如何设置 babelrc 实现 treeShaking
- 之前介绍过webpack3的新特性，里面提到webpack2支持了ES6的import和export，不需要将ES6的模块先转成CommonJS模块，然后再进行打包处理。正基于此，webpack2引入了tree-shaking技术，能够在模块的层面上做到打包后的代码只包含被引用并被执行的模块，而不被引用或不被执行的模块被删除掉，以起到减包的效果。
- 根据webpack官网的提示，webpack支持tree-shaking，需要修改配置文件，指定babel处理js文件时不要将ES6模块转成CommonJS模块，具体做法就是：
- https://www.jianshu.com/p/6c998f83e637， 很好值得借鉴
```
babel 配置在考虑。。。都是啥意思
配置还再容商榷
{
  "presets": [
    [
      "env",
      {"modules": false}, // webpack2之后，不用babel来处理import了，自身就会处理所以需要加上这个配置，这样就可以开启webpack2的 tree shanking
     //  {"targets": { "browsers": ["last 2 versions", "safari >= 7", "ie>=9"]}}, 需要设置浏览器版本时
    ]
  ],
  "plugins": ["syntax-dynamic-import"] // 使用 import 动态导入模块时必须
}
```

- happyPack 压缩
- uglify 更好的压缩

- 亟待解决的问题：
    1. babelrc 的配置问题
    2. react 模板，处理(react-hot-loader)
    3. import 和 require.ensure的区别
    4. happyPack 开启处理loader
    5. uglify 处理效率

- 感觉升级意义不是很大，明天调查，webpack1是否支持 更好的uglify和happyPack