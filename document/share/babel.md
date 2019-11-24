1. babel 用途
    - babel 是 JavaScript 编译器，让我们可以用上浏览器不支持的未来的JavaScript的语法
    - Babel 是一个工具链，主要用于在旧的浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容版本的 JavaScript

2. babel 的组成
    - 所有babel 相关的功能模块都以单独的 npm 包发布，其范围为 (@babel/*，自babel7开始) 
    - 核心库：@babel/core
    - 终端库：@babel/cli 可以在命令行使用 babel 命令
    - plugin
    - presets(预设 ==> 一组plugin的组合)
  
3. babel6 与 babel7 的一些变化
    - babel6 相关
        - presets 已写入es规范的新语法、stage-x 仍在提案阶段的es新特性
        - 年份相关presets babel-preset-es2015, babel-preset-es2016, babel-preset-es2017, babel-preset-latest
        - presets-stage-x： 仍然处提案阶段的js ，代表当前提案阶段的一组插件的预设
        - class fields 提案（如 stage-2 阶段：react 代码中常用的 类的属性初始化器语法 handleClick = （）=> {}, babel-plugin-transform-class-properties, 7变为:plugin-proposal-class-properties），具体请参考:https://babel.docschina.org/docs/en/6.26.3/babel-preset-stage-0
    2. babel7-2018年8月发布
        - 废弃babel-presets-es201x，统一用 @babel/env 代替
        - 移除提案阶段的 stage-x ，自己按需添加（因为规范时刻在变动，所以stage-x对应的内容也在变动，容易产生依赖问题）
        - 
4. @babel/polyfill
    总结：@babel/cli 从终端运行babel，@babel/polyfill 来实现所有新的 JavaScript功能，env presets 只包含我们使用的新的功能的转换，实现我们目标浏览器缺少的功能
    以下配置会根据你设置的环境动态为你加载 polyfill
    ```
      ["@babel/env", {
        targets: { // 使用 compat-table 检测
            chrome: 53,
            ...
        },
        useBuiltIns: "usage",
        modules: false, // 开启 tree shanking
    }]
    ```
    - 小提示：搭配 @babel/plugin-transform-runtime 抽离辅助函数 require引入
5. babel 与 ts 
    - @babel/presets-typescript 替代 ts-loader
    - [TypeScript 和 Babel：美丽的结合](https://zhuanlan.zhihu.com/p/59614089)
    - 在 babel7 之前，ts和babel一起使用是这样的过程 `ts -> ts complie -> es6+ -> babel -> js ` ，即 webpack 通过 `ts-loader` 将 `.ts` 文件，编译完然后在交给 babel 处理
    - babel7: 只有一个编译器那就是 babel
    - babel 是如何处理 typescript 代码的？
    - 通过 @babel/presets-typescript 将所有的类型系统删除，将其转换为普通的 js 代码，`tsc (typescript) 编译器`只进行类型校验功能
6. 配置文件的写法
    - `presets & plugin`
    - .babelrc
    - babel.config.js 
7. babel & babylon & ast