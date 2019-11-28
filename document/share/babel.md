## babel 基础介绍

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
    - babel7-2018年8月发布
        - 废弃babel-presets-es201x，统一用 @babel/env 代替
        - 移除提案阶段的 stage-x ，自己按需添加（因为规范时刻在变动，所以stage-x对应的内容也在变动，容易产生依赖问题）
    - presets & plugin: presets是一组预先设置好的插件，插件先于presets执行，插件执行顺序从前往后，presets执行顺序从后往前
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
    - @babel/presets-typescript ==> ts官方和babel官方合作的产物， 替代 ts-loader
    - [TypeScript 和 Babel：美丽的结合](https://zhuanlan.zhihu.com/p/59614089)
    - 在 babel7 之前，ts和babel一起使用是这样的过程 `ts -> ts complie -> es6+ -> babel -> js ` ，即 webpack 通过 `ts-loader` 将 `.ts` 文件，编译完然后在交给 babel 处理
    - babel7: 只有一个编译器那就是 babel
    - babel 是如何处理 typescript 代码的？
    - 通过 @babel/presets-typescript 将所有的类型系统删除，将其转换为普通的 js 代码，`tsc (typescript) 编译器`只进行类型校验功能

## 配置文件的写法
    - `presets & plugin`
    - .babelrc
    - babel.config.js 
  
## babel & babylon & ast
  ![RUNOOB 图标](https://camo.githubusercontent.com/868eee501ac4960259c154a510c6fe9257df8221/68747470733a2f2f696d672e616c6963646e2e636f6d2f7466732f5442315547435165564f5742754e6a7930466958585846785658612d323036362d313135322e706e675f3132303078313230302e6a7067)

> babel 是一个编译器（输入源码 => 输出编译后的代码），编译过程分为三个阶段：解析、转换和打印输出，Babel 虽然开箱即用，但什么动作都不做，他基本上类似于 `const babel = code => code`，将代码解析之后在输出同样的代码，如果想要Babel做一些实际的工作，就需要为其添加插件


- `babel-plugin-import` 分析，看不懂啊啊啊啊啊啊啊...

- Parser --> Traversal --> Transform --> Generator ==> 解析、遍历、转换、生成
- AST abstract syntax tree
- ast 中的节点都是继承自 Node 节点，Node 节点有 type 和 Ioc 两个属性，分别代表类型和位置

- babel 相关周边
```
babylon ==> parse

babel-traverse ==> 遍历

babel-types ==> 判断 node 的类型

Babel 的后序工作 -- Babel-generator、AST 树转换成源码

babel 的插件体系 -- 结点的转换定义
babel 的插件就是定义如何转换当前结点，babel 插件能做的事情就只要转换 ast 树
```