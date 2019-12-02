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
        useBuiltIns: "usage", // true/false/usage
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

> Babel是JavaScript编译器，更确切的说是源码到源码的编译器，通常也叫做转换编译器。

> babel 是一个编译器（输入源码 => 输出编译后的代码），编译过程分为三个阶段：解析、转换和打印输出，Babel 虽然开箱即用，但什么动作都不做，他基本上类似于 `const babel = code => code`，将代码解析之后在输出同样的代码，如果想要Babel做一些实际的工作，就需要为其添加插件



- Parser --> Traversal --> Transform --> Generator ==> 解析、遍历、转换、生成
  - AST abstract syntax tree
  - ast 中的节点都是继承自 Node 节点，Node 节点有 type 和 Ioc 两个属性，分别代表类型和位置

### 静态分析
> 静态分析是在不需要执行代码的前提下对代码进行分析的处理工程（执行代码的同时进行代码分析即是动态分析），静态分析带来的好处非常多，可用于 语法检查、代码高亮、代码转换、优化、压缩场景

- babel 相关周边
```
babylon ==> parse

babel-traverse ==> 遍历

babel-types ==> 判断 node 的类型

Babel 的后序工作 -- Babel-generator、AST 树转换成源码

babel 的插件体系 -- 结点的转换定义
babel 的插件就是定义如何转换当前结点，babel 插件能做的事情就只要转换 ast 树
```
- ast 解析流程
```
源码：

function square(n) {
  return n * n;
}

// ast
{
  type: "FunctionDeclaration",
  id: {
    type: "Identifier",
    name: "square"
  },
  params: [{
    type: "Identifier",
    name: "n"
  }],
  body: {
    type: "BlockStatement",
    body: [{
      type: "ReturnStatement",
      argument: {
        type: "BinaryExpression",
        operator: "*",
        left: {
          type: "Identifier",
          name: "n"
        },
        right: {
          type: "Identifier",
          name: "n"
        }
      }
    }]
  }
}
```
- 这样的每一层结构也被叫做节点（Node），一个AST可以由单一的节点或是成百上千个节点构成，他们组合在一起可以描述用于静态分析的语法，
- 每一个节点都有如下所示的接口
```
interface Node {
    type: string
}
字符串形式的 type 字段表示节点类型，如：FunctionDeclaration、Identifier、BinaryExpression
每一种类型的节点定义了一些附加属性用来进一步描述该节点类型

Babel 还未每个节点额外生成了一些属性，用于描述该节点在原始代码中的位置
{
    type: ...,
    start: 0,
    end: 38,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line3,
            column: 1
        }
    }
}
每个节点都会有 start end loc 这几个属性
```
### babel 的处理步骤
- Babel 的三个主要处理步骤分别是：解析 - 转换 - 生成
- 解析步骤接收代码并输出 AST，底层依赖 `Babylon` 解析器 这个步骤分为两个阶段：`词法分析(Lexical Analyis)`, `语法分析(Syntactic Analyis)`
  - 词法分析：把字符串形式的代码转换为 令牌(token)流，令牌类似于 AST中的节点
  - 语法分析：把令牌流转换成 AST 形式，这个阶段会使用令牌中的信息把他们转换成一个 AST 的表述结构

- 转换：接收 AST 并对其进行遍历，在此过程中进行添加、更新及移除等操作。这是babel或是其他编译器中最复杂的过程同时也是插件将要介入工作的部分
- 生成：代码生成步骤最终（经过一些列转换之后）的ast转换成字符串形式的代码，同时还会创建源码映射（source maps），代码生成其实很简单：深度优先遍历整个AST，然后构建可以表示转换后代码的字符串
- 深度优先 树形遍历

- 遍历过程
```
类型：
  FunctionDeclaration
  Identifier            标识符
  BlockStatement        块语句 {}
  ReturnStatement       返回语句
  BinaryExpression      二元表达式语句

```
### API
- babylon：Babylon 是 Babel 的解析器，最初从 Acorn项目fork出来的
```
babylon.parse(code, {
  source: "module", // moudle 严格模式执行，script 默认行为
  plugin: ...
})
```
- babel-traverse：遍历 ==> 维护了整棵树的状态，并且负责模块替换、移除和添加节点
- babel-generator: 模块时babel 代码的生成器，他读取 AST 并将其转换为源码和源码的，映射
- babel-types: 一个工具库包含构造、验证、以及变换 AST 节点的方法，拥有每一个单一节点的类型定义，包括节点包含哪些属性，什么是合法值，如何构建节点、遍历节点以及节点的别名等信息

### 编写第一个 babel 插件
1. 等号 左右值互换
2. 按需加载 lodash
```
import { cloneDeep } from 'antd';
      ↓ ↓ ↓ ↓ ↓ ↓
var cloneDeep = require('lodash/cloneDeep');
```
3. 按需加载 antd 
```

import { Button } from 'antd';
      ↓ ↓ ↓ ↓ ↓ ↓
var _button = require('antd/lib/button');

```

### 参考文档
- [babel插件入门-AST（抽象语法树）](https://juejin.im/post/5ab9f2f3f265da239b4174f0)
- [babel官网](https://www.babeljs.cn/docs/presets)
- [李靖 babel-plugin-ast](https://github.com/barretlee/babel-plugin-ast)
- [ast解析](https://astexplorer.net/)
- [babel-ast文档](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
- [babel-介绍文档](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)
- [开发babel插件](https://fanerge.github.io/2018/Babel%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E5%8F%8ABabel%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91%E6%8E%A2%E7%B4%A2.html)
- [开发babel插件-1+1](https://juejin.im/post/5a9315e46fb9a0633a711f25)



### 展示代码
```
博客地址：https://juejin.im/post/5a17d51851882531b15b2dfc
url地址：https://astexplorer.net/

import { cloneDeep, get } from 'lodash'

export default function (babel) {
  const { types: t } = babel;
  
  return {
    visitor: {
ImportDeclaration(path, _ref = {opts:{}}){
        const specifiers = path.node.specifiers; // 说明符 
        const source = path.node.source;         // source 来源
       // 判断是不是来自 import
       if (!t.isImportDefaultSpecifier(specifiers[0]) ) {
	         //遍历  cloneDeep get
            var declarations = specifiers.map((specifier) => {  
			      //创建importImportDeclaration节点
              return t.ImportDeclaration(                     
                [t.importDefaultSpecifier(specifier.local)],
                t.StringLiteral(`${source.value}/${specifier.local.name}`)
              )
            })
            path.replaceWithMultiple(declarations)
        }
      }
    }
  };
}

```

- 今天我分享的主题叫做 babel 工作原理探析，一直以来很想深入了解 babel 这部分内容，无奈每次都没能看下去，正好借这次机会仔细看了一下。如果待会我说的有什么问题，你们随时打断我