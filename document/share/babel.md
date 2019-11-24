1. babel 用途
    - babel 是 JavaScript 编译器，让我们可以用上浏览器不支持的未来的JavaScript的语法
    - Babel 是一个工具链，主要用于在旧的浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容版本的 JavaScript

2. babel 的组成
    - 所有babel 相关的功能模块都以单独的 npm 包发布，其范围为 (@babel/*，自babel7开始) 
    - 核心库：@babel/core
    - 终端库：@babel/cli 可以在命令行使用 babel 命令
    - plugin
    - presets(预设 ==> 一组plugin的组合)
    1. babel6 相关
        - presets 已写入es规范的新语法、stage-x 仍在提案阶段的es新特性
        - 年份相关presets babel-preset-es2015, babel-preset-es2016, babel-preset-es2017, babel-preset-latest
        - presets-stage-x： 仍然处提案阶段的js ，代表当前提案阶段的一组插件的预设
        - class fields 提案（如 stage-2 阶段：类的属性初始化器语法 handleClick = （）=> {}, babel-plugin-transform-class-properties, 7变为:plugin-proposal-class-properties），具体请参考:https://babel.docschina.org/docs/en/6.26.3/babel-preset-stage-0
    2. babel7
        - 废弃babel-presets-es201x，统一用 @babel/env 代替
        - 移除提案阶段的 stage-x ，自己按需添加（因为规范时刻在变动，所以stage-x对应的内容也在变动，容易产生依赖问题）
        - 
    3. @babel/polyfill

    总结：@babel/cli 从终端运行babel，@babel/polyfill 来实现所有新的 JavaScript功能，env presets 只包含我们使用的新的功能的转换，实现我们目标浏览器缺少的功能
3. 配置文件的写法
    - .babelrc
    - babel.config.js
3. ast 转换--babel-transform