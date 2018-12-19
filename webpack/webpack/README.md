# webpack 基础知识

```
webpack 配置

devtool: source-map 生成何种类型的 source map，方便打包后的调试
entry：webpack 从哪里开始构建整个依赖关系。
output：打包后输出的路径（path）和输出的文件名（filename）。可以有多个 entry point，但只能有一个 output
module:{
    rules:[
        {
            test: 正则匹配文件,
            use: 使用哪个loader
            include/exclude: 必须处理或屏蔽某些文件处理
            options: 当前loader需要的特殊配置（可选）
        }
    ]
}
plugins：[] 插件
resolve 通过别名、拓展名、根路径或备用目录等属性决定 webpack如何更快找到 import/require() 的模块
resolve.alias: 用别的路径或模块代替。把requirejs项目改为webpack项目时可以利用此属性
resolve.extensions：通过拓展名组成的数组解析require() 的模块文件。比如加载一个 coffeeScript，需要增加 .coffee扩展名。若修改后必须增加空字符串为第一个元素
```

## 入口（entry）
- 入口起点（entry point）指示webpack应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack会找出有哪些模块和库是入口起点（直接和间接）依赖的。
- 每个依赖项随即被处理，最后输出到称之为 bundles 的文件中
- 可以通过在webpack配置中配置 entry 属性，来制定一个入口起点（或多个入口起点）
- 每个 bundle 中都有一个 webpack 引导(bootstrap)
- 从表面上看，这告诉我们 webpack 从 app.js 和 vendors.js 开始创建依赖图(dependency graph)。这些依赖图是彼此完全分离、互相独立的（每个 bundle 中都有一个 webpack 引导(bootstrap)）。这种方式比较常见于，只有一个入口起点（不包括 vendor）的单页应用程序(single page application)中。

## 出口（output）
- output 属性告诉webpack在哪里输出他所创建的 bundles，以及如何命名这些文件。你可以通过在配置中指定一个 output 字段，来配置这些处理过程。
- 配置 output 选项可以控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个入口起点，但只能定一个输出配置
- 用法：在webpack中 配置 output 属性最低的要求是，将他设置为一个对象包括以下两点：
    1. filename 用于输出文件的文件名。
    2. 目标输出目录 path 的绝对路径
- 如果配置创建了多个单独的 chunk （例如：使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件），则应该使用占位符（substiutions）来确保每个文件具有唯一的名称


## loader 在 module.rules: {} 在这里面配置 loader  { test: '', use: [] }
- loader 用于对模块的源代码进行转换。loader可以使你在 import 或加载模块时预处理文件。因此，loader类似于其他构建工具中‘任务task’,并提供了处理前端构建步骤的强大方法。
- loader可以将文件从不同语言（如：typeScript）转换为 JavaScript，或将内联图像转换为 data URL 。loader甚至允许你直接在 JavaScript模块中 import css 文件
- loader让webpack能够处理那些非JavaScript文件（webpack自身只理解JavaScript）。loader可以将所有类型的文件转换为webpack能够处理的有效模块，然后你就可以利用webpack的打包能力，对他们进行处理
- 本质上，webpack loader将所有类型的文件，转换为应用程序的依赖图（和最终的bundle）可以直接引用的模块
- 注意：loader 能够 import 导入任何类型的模块（例如：.css 文件），这是webpack特有的功能，其他打包程序或任务执行器的可能并不支持
- 在更高层面，在webpack的配置中 loader 有两个目标：
    1. test 属性，用于识别出应该被对应的loader进行转换的某个或某些文件
    2. use 属性，表示进行转换时，应该使用哪个 loader 
- 重要的是要记得，在webpack配置中定义loader时，要定义在 module.rules 中，而不是 rules。
- 然而，在定义错误时，webpack会给出严重的警告，为了使你受益于此，如果没有按照正确的方式去做，webpack会给出严重的警告

### 使用 loader-在你的应用程序中，有三种使用loader的方式
 1. 配置（推荐）：在webpack.config.js文件重指定 loader
 2. 内联：在每个 import 语句中显式指定 loader
 3. CLI：在 shell 命令中指定他们
### 配置：module.rules 允许你在 webpack配置中指定多个 loader。这是展示loader的一种简明方式，并且有助于使代码变得简洁。同时让你对各个 loader有个全局概览

### loader特性
- loader支持链式调用。能够对资源使用流水线（pipeline）。一组链式的loader将按照相反的顺序执行。loader链中的第一个loader返回值给下一个loader。在最后一个loader，返回webpack所预期的JavaScript。
- loader 可以是同步，也可以是异步
- loader 运行在 Node.js 中，并且可以执行任何可能的操作
- loader 接收查询参数。用于对 loader 传递配置
- loader 也能够使用 options对象进行配置
- 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段
- 插件（plugin）可以为loader带来更多特性
- loader能够产生额外的任意文件
- loader 通过预处理函数，为JavaScript生态提供了更多能力。用户现在可以更加灵活引入细粒度逻辑，例如压缩、打包、翻译语言

### loader 解析
- loader 遵循标准的模块解析。多数情况下，loader 将从模块路径（通常将模块路径认为是 npm install, node_modules）解析。
- loader 模块需要导出为一个函数，并且使用 Node.js 兼容的 JavaScript 编写。通常使用 npm 进行管理，但是也可以将自定义 loader 作为应用程序中的文件。按照约定，loader 通常被命名为 xxx-loader


## plugins
- 插件是webpack的支柱功能。webpack自身也是构建与此，你在webpack配置中用到的相同的插件系统之上！插件目的在于解决loader无法实现的其他事。
### 剖析
- webpack 插件是一个具有apply属性的 JavaScript对象，apply属性会被 webpack.compiler 调用，并且 compiler 对象可在整个便以生命周期访问

### 用法
- 由于插件可以携带参数/选项，你必须在webpack配置中，向 plugins 属性传入 new 实例
- loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。
- 插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。
- 想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中，多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

## 配置
> 因为webpack配置是标准的 Node.js CommonJS模块，你可以做一下事情：
- 通过 require(...) 导入其他文件
- 通过 require(...) 使用 npm 的工具函数
- 使用 JavaScript控制流表达式，例如： ？ ：操作符
- 对常用值使用常量或变量
- 编写并执行函数来生成部分配置
- 以下是最简单的配置：
```
var path = require('path');
module.exports = {
    entry: './foo.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js'
    }
}
```

## 模块
- 在模块化编程中，开发者将程序分解成离散功能块（discrete chunks of functionality），并称之为模块。
### 什么是 webpack 模块
1. 对比 Node.js 模块，webpack 模块能够以各种方式表达他们之间的依赖关系，几个例子如下：
    - ES2015 import 语句
    - CommonJS require() 语句
    - AMD define 和 require 语句
    - css/sass/less 文件中的 @import 语句
    - 样式 url(...) 或 HTML文件（img src）
    - webpack1 需要特定的loader来转换 ES2015 import，然而通过 webpack2可以开箱即用
2. 支持的模块类型
    - webpack通过loader可以支持各种语言和预处理器编写模块。loader 描述了 webpack 如何处理非 JavaScript模块，并且在 bundle中引入这些依赖，webpack社区已经为各种流行语言和语言处理器构建 loader
    - 总的来说，webpack提供了可定制的、强大和丰富的API，允许任何技术栈使用webpack，保持了在你的开发测试、和生成流程中无侵入性


## 模块解析
- resolve是一个库（library），用于帮助找到模块的绝对路径。一个模块可以作为另一个模块的依赖模块，然后被后者使用
### webpack中的解析规则
- 使用 enhanced-resolve,webpack能够解析三种文件路径 ： 绝对路径、相对路径、模块路径

### 解析 Loader（Resolving Loaders）
- Loader解析遵循与文件解析器指定的规则相同规则，但是resolverLoader 配置选项可以用来为 Loader 提供独立的解析规则

### 缓存
- 每个文件系统访问都被缓存，以便更快触发对同一文件的多个并行或串行请求。在观察模式下，只有修改过的文件会从缓存中摘出。如果关闭观察模式，在每次编译前清理缓存。

## 依赖图
- 任何时候，一个文件依赖于另一个文件，webpack 就把此视为文件之间有依赖关系。这使得 webpack 可以接收非代码资源(non-code asset)（例如图像或 web 字体），并且可以把它们作为依赖提供给你的应用程序。

- webpack 从命令行或配置文件中定义的一个模块列表开始，处理你的应用程序。 从这些入口起点开始，webpack 递归地构建一个依赖图，这个依赖图包含着应用程序所需的每个模块，然后将所有这些模块打包为少量的 bundle - 通常只有一个 - 可由浏览器加载。.

## 构建目标(Targets)
- 因为服务器和浏览器代码都可以用 JavaScript 编写，所以 webpack 提供了多种构建目标(target)，你可以在你的 webpack 配置中设置。


## Manifest
在使用 webpack 构建的典型应用程序或站点中，有三种主要的代码类型：

你或你的团队编写的源码。
你的源码会依赖的任何第三方的 library 或 "vendor" 代码。
webpack 的 runtime 和 manifest，管理所有模块的交互。

文件名称：散列hash值

## 模块热替换(Hot Module Replacement)



# 传统script引入缺陷
- 无法立即体现，脚本的执行依赖于外部扩展库(external library)。
- 如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。
- 如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码。

# 使用webpack来代替script建立模块依赖关系
- 首先，我们稍微调整下目录结构，将“源”代码(/src)从我们的“分发”代码(/dist)中分离出来。
- “源”代码是用于书写和编辑的代码。“分发”代码是构建过程产生的代码最小化和优化后的“输出”目录，最终将在浏览器中加载：

- npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装！
- npx 甚至支持运行远程仓库的可执行文件

- `npx webpack src/index.js dist/bundle.js`
- 执行 npx webpack，会将我们的脚本作为入口起点，然后输出为 bundle.js。
- Node 8.2+ 版本提供的 npx 命令，可以运行在初始安装的 webpack 包(package)的 webpack 二进制文件（./node_modules/.bin/webpack）：

# webpack 模块
- ES2015 中的 import 和 export 语句已经被标准化。虽然大多数浏览器还无法支持它们，但是 webpack 却能够提供开箱即用般的支持
- 实际上 webpack 的 import 和 export 是靠 ES6支持的
- webpack 不会更改代码中除 import 和 export 语句以外的部分。如果你在使用其它 ES2015 特性，请确保你在 webpack 的 loader 系统中使用了一个像是 Babel 或 Bublé 的转译器。

# webpack 配置文件
- 大多数项目会需要很复杂的设置，这就是为什么 webpack 要支持配置文件。这比在终端(terminal)中输入大量命令要高效的多，所以让我们创建一个取代以上使用 CLI 选项方式的配置文件：

- 直接执行 `npx webpack --config webpack.config.js ` 即可打包文件
- 如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它。我们在这里使用 --config 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用。
- 比起CLI这种简单直接的使用方式，配置文件具有更多的灵活性。我们可以通过配置方式指定loader规则（loader rules）、插件（plugins）、解析选项（resolve options），以及许多其他增强功能


# NPM脚本【NPM Scripts】==== CLI 就是运行 NPM的脚本
- 考虑到用CLI 这种方式来运行本地的webpack不是特别方便，我们可以设置一个快捷方式。在package.json添加一个npm脚本（npm script）
```
{
    ...
    "scripts" : {
        "build" : "webpack"
    }
}
```
- 现在，可以使用 `npm run build` 命令，来代替我们之前使用的 npx 命令。注意，使用 npm 的`scripts`,我们可以像使用 `npx`那样通过模块名引用安装 `npm` 包。这是大多数基于 `npm` 的项目遵循的标准，因为它允许所有贡献者使用同一组脚本（如果必要，每个flag都带有 --config 标志）。

# 结论，现在你已经实现了一个基本的构建过程
- 如果你使用的是 npm 5，你可能还会在目录中看到一个 package-lock.json 文件。

# 管理资源
- 在webpack出现之前，前端开发人员会使用grunt和gulp等工具来处理资源，并将它们从 /src 文件移动到 /dist 或 /build 目录中。同样方式也被用于JavaScript模块，但是像webpack这样的工具，将动态打包（dynamically bundle）所有依赖项（创建所谓的依赖图（dependency graph））。这是极好的创举，因为现在每个模块都可以明确表述它自身的依赖，我们避免打包未使用的模块。
- webpack 最出色的功能之一就是，除了JavaScript，还可以通过loader引入任何其他类型文件。也就是说，以上列出的那些JavaScript的优点（例如显示依赖），同样可以用来构建或web应用程序中的所有非JavaScript内容。

## 加载css
- 为了从JavaScript模块中import一个css文件，你需要在 module配置中安装并添加 style-loader和css-loader
- `npm install --save-dev style-loader css-loader`
- webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的loader。在这种情况下，以.css结尾的全部文件，都将被提供给 `style-loader` 和 `css-loader`.
- 这使你可以再依赖于此样式的文件中 `import './style.css'`。现在，当该模块运行时，含有css字符串的 `<style>`标签，将被插入到html文件的`<head>`中
- 请注意，在多数情况下，你也可以进行css分离，以便在生产环境中节省加载时间。最重要的是，现有的loader可以支持任何你可以想到的css处理器风格`postcss` `less` `sass`

## 加载图片
- 假想，现在我们正在下载css，但是我们的背景和图标这些图片，要如何处理呢？使用file-loader,我们可以轻松地将这些内容混合到css中
- `npm install --save-dev file-loader`
- 现在，当你 `import myImage from './my-image.png'`,该图像将被处理并添加到`output`目录，并且`myImage`变量将包含该图像在处理后的最终url。当使用css-loader时，如图所示，你的css中的 `url('./my-image.png')`会使用类似的过程去处理。loader会识别这是一个本地文件，并将`./my-image.png` 路径，替换为输出目录中图像的最终路径。html-loader以相同的方式处理`<img src="./my-image.png">`

- 合乎逻辑下一步是，压缩和优化你的图像。查看 image-webpack-loader 和 url-loader ，以了解更多关于如果增强家在处理图片的功能。

## 加载字体
- 像自提这样的资源如何处理呢？ file-loader 和 url-loader 可以接受并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将他们用于任何类型文件，包括字体。

## 加载数据 
- 此外，可以加载的资源还有数据，如JSON文件，CSV，tsv，和XML。类似于Nodejs，json支持实际上是内置的，也就是说 `import Data from './data.json'`默认将正常运行。要导入CSV、tsv和XML，你可以使用 csv-loader 和 xml-loader

## 全局资源
- 上述所有内容中最出色的之处是，以这种方式加载资源，你可以以直接的方式将模块和资源组合在一起。无需依赖于含有全部资源的`/assets`目录，而是将资源与代码组合在一起。
- 一个模块就是一个组件，包括各种资源文件
- 这种配置方式会使你的代码具备可移植性，因为现有的统一的方式会造成所有资源紧密偶合在一起。假如你想在另一个项目中使用`/my-component`,只需要将其复制或移动到 `/components` 目录下。只要你已经安装了任何扩展依赖（external dependencies），并且你已经在配置中定义过相同的loader，那么项目应该能够良好运行。
- 但是，假如你无法使用新的开发方式，只能被固定于就有开发方式，或者你有一些在多个组件（视图，模板，模块等）之间共享的资源。你仍然可以将这些资源存储在公共目录（base directory）中，甚至配合使用 alias来使他们更方便 `import导入`
- webpack exteral 选项：webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问。

## 回退处理

# 管理输出

- 设定 HtmlWebpackPlugin
- 首先安装插件 `npm install --save-dev html-webpack-plugin`
- 在我们构建之前，你应该了解，虽然在`dist/` 文件夹我们已经用 `index.html`这个文件，然而 `HtmlWebpackPlugin`还是会默认生成`index.html`文件。也就是说，它会用新生成的 `index.html`文件，把我们原来的替换。
- 在编辑器中将 `index.html`打开，你就会看到`HtmlWebpackPlugins`创建了一个全新的文件，所有的bundle会自动添加到 html 中。

> 清理`/dist`文件夹
- 由于过去的指南和代码示例遗留下来，导致我们的 `/dist` 文件夹相当混乱。webpack会生成文件，然后将这些文件放置在`/dist`文件夹中，但是webpack无法追踪到哪些文件是在项目中用到的
- 通常，在每次构建前清理`/dist`文件夹，是比较推荐的做法，因此只会生成用到的文件。
- `clean-webpack-plugin`是一个比较普及的管理插件
- `npm install clean-webpack-plugin --save-dev`
- 结论：现在，你已经了解如何向 HTML 动态添加 bundle。


# 开发环境使用 webpack
## 使用 source map
- 当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。
- 例如：如果将三个源文件a.js b.js c.js 打包到一个 bundle，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向 bundle.js 。这通常没有太多帮助，因为你可能需要准确地知道错误来自于哪个源文件。
- 为了更容易地追踪错误和警告，JavaScript提供了 source map 功能，将编译后的代码映射回源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你。

## 选择一个开发工具
- 每次要编译代码时，手动运行 `npm run build` 就会变得很麻烦
- webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码
    1. webpack`s Watch Mode
    2. webpack-dev-server
    3. webpack-dev-middleware
- 多数场景下，你可能需要使用 `webpack-dev-server`  （webpack-dev-server 配合 HMR 使用）
#### 使用观察模式
- 你可以指示 webpack watch 依赖图中的所有文件进行更改。如果其中一个文件被更新，代码将被重新编译，所以你不手动运行整个构建。
- 我们添加一个用于启动webpack的观察模式的 npm script 脚本
```
"script": {
    "watch": "webpack --watch"
}
```
现在，你可以在命令行中运行 `npm run watch` ,就会看到webpack编译代码，然而却不会退出命令。这是因为script脚本还在观察文件
- 不能实时刷新浏览器看到效果

#### 使用 webpack-dev-server
- `webpacl-dev-server` 为你提供了一个简单的web服务器，并且能够实时重新加载（live reloading）
- 安装 `npm install --save-dev webpack-dev-server`
- 修改配置文件，告诉开发服务器（dev server），在哪里查找文件：
```
devServer: {
    constentBase: './dist'
}
```
- 以上配置告知 webpack-dev-server ，在 localhsot:8080 下建立服务，将dist目录下的文件，作为可访问的文件
- 添加一个 script 脚本，可以直接运行开发服务器(dev server); `start: webpack-dev-server --open`
- 以上配置告知 `webpack-dev-Server`, 在`localhsot:8080`下建立服务，将`dist`目录下的文件，作为可访问文件

#### 使用webpack-dev-middleware
- webpack-dev-middleware 是一个容器（wrapper），他可以把webpack处理后的文件传递给一个服务器（server）。webpack-dev-server 在内部使用了它，同时，他可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求。接下来是一个 `webpack-dev-middleware` 配合 express server的示例。
- 首先安装 `express` 和 `webpack-dev-middleware`; `npm install --save-dev express webpack-dev-middleware`

### 调整文本编辑器
- 使用自动编译代码时，可能会在保存文件时遇到一些问题。某些编辑器具有“安全写入”功能，可能会影响重新编译

# 模块热替换
- 模块热替换（Hot Module Replacement或 HMR）是webpack提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。
- HMR 不适用与生产环境，这意味着他应当只在开发环境使用
### 启用HMR 
- 启用此功能实际上相当简单。而我们要做的，就是更新 `webpack-dev-server`的配置，和使用webpack内置的HMR插件。我们要删除掉 print.js的入口起点，因为他现在正被`index.js`模式使用

- `"start": "webpack-dev-server --open"`,这种方式开启的服务才能进行 HMR

### 通过Node.js API
- 当使用 webpack dev server和Node.js API时，不要将 dev server选项放在 webpack 配置对象（webpack config object）中。而是，在创建选项时，将其作为第二个参数传递。例如：`new WebpackDevServer(compiler, options)` 
- 想启用HMR，还需要修改webpack配置对象，使其包含 HMR 入口起点。
- webpack-dev-server package 中具有一个叫做 `addDevServerEntrypoints` 的方法，你可以通过使用这个方法来实现。

### HMR 修改样式表
- 借助于 `style-loader` 的帮助，css的模块热替换实际是相当简单的。当更新css依赖模块时，此loader在后台使用 `module.hot.acept` 来修补（patch） `<stle>` 标签
- 可以使用以下命令安装两个 loader `npm install --save-dev style-loader css-loader`

### 其他代码和框架
- 社区还有许多其他loader和示例，可以使HMR与各种框架和库library平滑地进行交互。。。
- React Hot Loader：实时调整 react 组件。
- Vue Loader：此loader支持用于vue组件的HMR,提供开箱即用体验。
- Redux HMR:无需loader或插件！只要对main store 文件进行简单的修改
- Angular HMR 

# Tree Shaking - 
- tree shaking 是一个术语，通常用于描述移除JavaScript上下文中的未引用代码（dead code）。他依赖于 ES2015模块系统中的静态结构特性，例如：import 和 export。这个术语和概念实际上是兴起于ES2015模块打包工具 rollup
- webpack2 内置支持 ES2015模块（别名：harmony modules），并能检测出未使用的模块导出。

### 精简输出- 未使用到的模块不进行打包 插件 `uglifyjs-webpack-plugin`
- 我们已经通过 `import` and `export` 语法，标识出了那些“未引用代码（dead code）”但是我们仍然需要从 bundle删除他们。要做到这一点，我们将添加一个能够删除未引用代码(dead code)的压缩工具（minifer）- `UglifyJSPlugin` - 在配置对象中添加。。。

- 安装 `npm install --save-dev uglifyjs-webpack-plugin`
- 随着tree shaking 和代码压缩，我们的bundle减小几个字节！
- 虽然，在这个特定示例中，可能看起来灭有减少很多，但是，在具有复杂的依赖树的大型应用程序上运行时，tree shaking或许会对bundle产生显著的体积优化。

### 警告
- 请注意，webpack本身并不会执行tree-shaking。他需要依赖于像`UglifyJS`这样的第三方工具来执行实际的未引用代码（dead code）删除工作。

### 结论
- 为了学会使用tree shaking，你必须
- 使用 ES2015模块语法（即import 和 export）
- 引入一个能够删除未引用代码（dead code）的压缩工具（minifier）例如：`UglifyJSPlugin`

# 生产环境构建
- 开发环境和生产环境的构建目标差异很大。
- 在开发环境中，我们需要具有强大的、具有实时重新加载（live reloading）或热模块替换（hot module replacement）能力的source map和localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的source map，以及更优化的资源，以改善加载时间，由于要逻辑分离，我们通常建议为每个环境编写独立的webpack配置。
- 虽然，以上我们将生产环境和开发环境做了略微区分，但是请注意，我们会遵循不重复原则，保留一个通用配置。为了将这些配置合并在一起，我们将使用一个名为 `webpakc-merge`的工具。通过通用配置，我们不必在特定环境的配置中重复代码。
- 安装`npm install --save-dev webpack-merge`
- 增加 ：`webpack.common.js   webpack.dev.js  webpack.prod.js`,用以区分开发生产环境

- 把scripts重新指向到新配置。我们将 `npm start` 定义为开发环境脚本，并在其中使用 `webpack-dev-server`,将`npm run build`定义为生产环境脚本。
```
start: webpack-dev-server --open --config webpack.dev.js
build: webpack --config webpack.prod.js
```

- source map: `devtool`选项 ，在生产环境中使用` source-map` 选项，在开发环境中使用 `inline-source-map`
- 避免在生产中使用 `inline-***` `eval-***`,因为他们可以增加bundle大小，并降低整体性能

### Split CSS
- 正如在管理资源中最后的加载 css 小节中所提到的，通常最好的做法是使用`ExtractTextPlugin`将css分离成单独的文件。

### CLI替代选项
- 


# 代码分离
- 代码分离是webpack中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的bundle，以及控制资源加载优先级，如果合理，会极大影响加载时间。
- 有三种常用的代码分离方法
    1. 入口起点： 使用 entry 配置手动地分离代码
    2. 防止重复： 使用 CommonsChunkPlugin 去重和分离 chunk
    3. 动态导入： 通过模块的内联函数调用来分离代码

### 入口起点（entry points）
- 这是迄今为止最简单、最直观的分离代码的方式。不过，这种方式手动配置较多，并有一些陷阱，我们将会解决这些问题。先看看如何从 main bundle 中分离一个模块
```
module.exports = {
    index: "./src/index.js",
    another: "./src/another.js"
}
```
- 如果入口 chunks 之间包含重复的模块，那些重复模块都会被引入各个 bundle 中
- 这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。
- 以上两点，第一点对我们的示例来说无疑是个问题，因为之前我们在 `./src/index.js` 中也引入过 lodash，这样就在两个 bundle 中造成重复引用。接着我们通过使用 `CommonChunkPlugin` 来移除重复的模块

### 防止重复（prevent duplication）
- `CommonChunkPlugin` 插件可以将公共的依赖模块提取到已有的入口chunk中，或者提取到一个新生成的chunk。让我们使用这个插件，将之前的示例中重复lodash模块去除

```
plugin:[
    // 代码分离插件 code spliting
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common' // 指定公共 bundle 的名称
    }),
]
```
- 这里我们使用 `CommonChunkPlugin` 之后，现在应该可以看出， index.bundle.js 中已移除了重复以来的模块。需要注意的是，`CommonChunkPlugin` 插件将 lodash 分离到单独的 chunk，并将其从 main bundle中移除，减轻了大小。执行 `npm run build`查看结果
- 以下是由社区提供的，一些对于代码分离很有帮助的插件和loaders
    1. `ExtractTextPlugin` ：用于将css从主应用程序中分离
    2. `bundle-loader` ： 用于分离代码和延迟加载生成的 bundle
    3. `promise-loader` : 类似于 bundle-loader，但是使用的是 promise
- `CommonsChunkPlugin` 插件还可以通过使用显示的 vendor chunks功能，从应用程序代码中分离vendor模块

### 动态导入（dynamic imports）
- 当涉及到动态代码分析时，webpack 提供了两个类似的技术。对于动态导入，第一种，也是优先选择的方式是，使用符合`ECMAScript提案的 import()` 语法。第二种，则使用webpack特定的 require.ensure()

1. import() 调用会在内部用到 promises 。如果在就有版本浏览器中使用 import() ，记得使用一个 polyfill 库
2. import() 会返回一个 promise，因此它可以和 async 函数一起使用。
3. import() 按需加载

### bundle 分析（bundle analysis）
- 如果我们以分离代码为开始，那么就以检查模块作为结束，分析输出结果是很有用处的。官方分析工具的初始选择。下面是一些社区支持
1. `webpack-chart` webpack 数据交互饼图
2. `...`


# webpack 懒加载
- 利用 ES6 import() 按需加载
- 当一个模块需要用户交互才进行加载，这样可以做到首屏加载优化
```
  button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
     var print = module.default;
     print();
   });
```
- 注意当调用ES6模块的 import() 方法（引入模块时），必须指向模块的 `.default`值，因为他才是 promise 被处理后返回的实际的 `module` 对象

# 缓存技术，文件发生变化时hash值修改，未发生变化时使用缓存文件

- path.resolve(引入loader) 或是 require.resolve(loader) , 用于解决 node_modules 不在同一路径下，将 lib 放置在根目录


# Shimming
- webpack 编译器能够识别遵循 ES2015模块语法，CommonJS或AMD规范编写的模块。然而，一些第三方库可能会引用一些全局依赖，如jquery中的 $，这些不符合规范的模块就是 shimming发挥作用的地方
- `ProvidePlugin` 能够通过在webpack编译的每个模块中，通过访问一个变量来获取 package 包。如果webpack知道这个变量在某个模块被引用了，那么webpack将在最终 bundle中引入我们给定的package。

- shim是一个库，它将一个新的api引入到一个旧的环境中，而且仅靠旧的环境重已有的手段实现。
- polyfill 就是一个用在浏览器API的shim。我们通常的做法是先检查当前浏览器是否支持某个api，如果不支持的话就加载对应的 polyfill。然后新旧浏览器就都可以使用这个api了

# 渐进式网络应用程序 PWA
- 离线环境下运行我们的项目
> 添加 Workbox `npm install workbox-webpack-plugin --save-dev`
```
plugins: [
    new WorkboxPlugin({
        // 这些选项帮助 ServiceWorkers 快速启用
        // 不允许遗留任何旧的 ServiceWorks
        clientClaim: true,
        skipWaiting: true
    })
]
```

# 迁移到新版本
- webpack 变化
1. loader 的书写 ， module.loaders 改为 module.rules
2. 取消在模块名中自动添加 `-loader` 后缀，必须手动添加
3. `json-loader` 不再需要手动添加
4. `UglifyJsPlugin sourceMap`  UglifyJsPlugin 的 sourceMap选项现在默认为 false而不是 true。这意味如果你在压缩代码时启用了 sourcemap，或者想要让 uglifyjs的警告能够对应到正确的代码运行，你需要将 UglifyJsPlugin的sourceMap设为 true
5. 移除 DedupePlugin 去重，如果你的项目用到很多依赖库，库文件里一定有很多代码是重复的，webpack会对这些文件进行去重，保证不会有重复的代码
6. require.ensure 以及 AMD require 将采用异步式调用，这些函数总是异步的，而不是当 chunk已经加载完成的时候同步调用他们的回调函数。require.ensure 现在依赖于原生的 promise。
7. ES2015的代码分割 在 webapck1重，可以使用 `require.ensure` 作为实现应用程序懒加载 chunks的一种方法
```
require.ensure([], function() {
    var foo = require("./module");
    )
})

ES2015模块加载规范定义了 import() 方法，可以在运行时（runtime）动态加载 ES2015模块。webpack将 import() 作为分割点（split-point）并将所有请求的模块（requested module）放置到一个单独 chunk中，import() 接收模块名作为参数，并返回一个 Promsie

function onClick() {
    import("./module").then(module => {
        return module.default;
    }).catch(err => {
        ...
    })
}
```

8. 动态表达式 可以传递部分表达式给 import() 这与 CommonJS对表达式的处理方式一致（webpack为所有可能匹配的文件创建context）。
import() 为每一个可能的模块创建独立的 chunk
```
function route(path,query) {
    return  import(`./routes/${path}/route`).then(route => new route.Route(query))
}
```

# 集成
- webpack是一个模块打包器（module bundler）（例如：Browserify 或 Brunch）。他不是一个任务执行器（task runner，例如：Make Grunt Gulp）
- 任务执行器就是用来自动处理常见的开发任务，例如项目的检查 (lint)、构建（build）、测试（test）。相对于打包器（bundler），任务执行器则聚焦于偏重上层的问题上面。你可以得益于，使用上层的工具，而降打包部分的问题留给webpack
- 打包器（bundler）帮助你取得准备用于部署 JavaScript和样式表，将他们转换为合适的浏览器的可用格式。例如：JavaScript可以压缩、拆分chunk和懒加载，以提高性能
### NPM Scripts
- 通常webpack用户使用 npm scripts 来作为任务执行器。
- 在 webpack-stream包（也称作 gulp-webpack）的帮助下，也可以很方便将Gulp与webpack集成。这种情况下，不需要单独安装 webpack，因为他是 webapck-stream直接依赖
- `npm install --save-dev webpack-stream` 只需要把 webpack 替换为 `require('webpack-stream')`,并传递一个配置文件就可以了


# webapck和Grunt以及Gulp相比有什么特性
- 没有可比性
- Gulp、Grunt是一种能够优化前端的开发流程工具，而webpack是一种模块化解决方案，不过webpack的优点使得webpack在很多场景下可以替代 Gulp、Grunt类的工具
- Grunt和Gulp的工作方式：在一个配置文件中，指明对某些文件进行类似编译，组合压缩等任务的具体步骤，工具之后可以自动替代你完成这些任务
- webpack的工作方式：把你的项目当做一个整体，通过一个给定的主文件（如：index.js）webpack将从这个文件开始找到你的项目的所有依赖文件，使用loader处理他们，最后打包成一个或多个浏览器可识别的JavaScript文件






# weboack 使用步骤
1. npm scripts 脚本运行配置文件
2. sourcemap   devtools:选项
3. 使用webpack构建本地服务器（用于实时监听本地代码的修改，并自动刷新浏览器显示修改后的效果 HMR） devServer 选项
  devServer:{
      contentBase: 默认webpack会为根文件提供本地服务器
      port
      inline: true, 源文件变动自动刷新页面

  }


# Babel 的安装
- babel其实十几个模块化的包，其核心功能位于babel-core 的 npm 包中，webpack可以把其他不同的包整合在一起使用，对于每一个你需要的功能或拓展，你都需要单独安装的包（用的最多的是解析ES6的babel-env-preset包和解析JSX的babel-preset-react包）
- 安装这些包 `npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react`
- loader配置
```
module: {
    rules: [
        {
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        "env", "react"
                    ]
                }
            },
            exclude: /node_modules/
        }
    ]
}
```
- 接着安装 react 和 react-dom `npm install --save-dev react react-dom`
### Babel的配置
- webapck 会自动调用 .babelrc 里的babel配置选项
- `npm install --save-dev babel-core babel-preset-env babel-loader `
- babel-preset-env 会根据  https://segmentfault.com/p/1210000008466178
```
.babelrc
{
    "presets": ["react", "env"]
}

babel 转码es5成功
为什么babel官方建议使用 env 明天研究
```

### 集成postcss
- `npm install --save-dev postcss postcss-loader prec postcss-import postcss-scss autoprefixer`
    1. postcss-loader: 加载器
    2. post-import
    3. post-scss 提供 mixins及variables的能力
    4. precss：提供各种类似sass的语法 比如变量、条件语句、循环、@define-extends
    5. autoprefixer：自动提供浏览器前缀
    6. cssnano： 压缩css
    7. css-netsed： css 嵌套
