# PostCSS 总结

> PostCSS 既不是预处理器也不是后处理器，而是一个平台

> PostCSS 本身并不处理任何具体任务，只有当我们为其附加各种插件之后，他才具有实用性

- PostCSS 就像是一个使能器（enabler），他可以不用完全替代现有的预处理器或后处理器，而只是作为他们的补充工具。PostCSS的工作机制主要包含解析代码、执行插件、渲染结果三部分：

- PostCSS 会将css代码解析成包含一系列节点的抽象语法树（AST, Abtract Syntax Tree）。树上的每一个节点都是css代码中某个属性的符号化表示。换言之，如果你写了条件语句并对应三种结果，那么在抽象语法树中就会有一个包含三个分支的节点，每个分支就是符号化的表示的结果。

- PostCSS 与 gulp 集成混合使用 -- 已实践
- PostCSS 与 webpack 集成混合使用 -- 已实践

- PostCSS常用插件
    * cssnext, 未来语法，颜色函数...
    * postcss-import,  导入文件
    * autoprefixer,    自动前缀
    * precss,  集成sass预处理器，功能强大包括 autoprefixer mixins
    * postcss-mixins,  混合宏，是用类似sass的混合宏，不可与 precss 混用
    * postcss-conditions 逻辑判断
    * ...