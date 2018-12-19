# babel-present-env 与 babel-polyfill

###  babelrc 配置文件
```
{
  "presets": [
    [
      "env",
      {
        "modules": false,
        "useBuiltIns": true,
        "targets": {"browsers": ["last 2 versions", "safari >= 7", "ie>=9"]}
      }
    ],
    "stage-0",
    "react"
  ],
  "plugins": [
    "syntax-dynamic-import",
    [
      "import",
      {
        "libraryName": "antd",
        "style": "css"
      }
    ]
  ]
}
```

> `babel-present-env `

```
根据你支持的环境自动决定适合你的 Babel 插件的 Babel preset。它使用了 compat-table

在没有任何配置选项的情况下，babel-preset-env 与 babel-preset-latest（或者babel-preset-es2015，babel-preset-es2016和babel-preset-es2017一起）的行为完全相同。

它不会包含 stage-x 插件。env 将会支持我们认为最新版本的JavaScript的所有插件（过我们匹配在 babel-preset-latest 中所作的）。


这款preset能灵活决定加载哪些插件和polyfill，不过还是得开发者手动进行一些配置(targets)。

```

> babel-polyfill


- `polyfill` 的意思

polyfill这个单词翻译成中文是垫片的意思，详细点解释就是桌子的桌脚有一边矮一点，拿一个东西把桌子垫平。polyfill在代码中的作用主要是用已经存在的语法和api实现一些浏览器还没有实现的api，对浏览器的一些缺陷做一些修补。例如Array新增了includes方法，我想使用，但是低版本的浏览器上没有，我就得做兼容处理


```
理解polyfill的意思之后，再来说说babel为什么存在polyfill。

因为babel的转译只是语法层次的转译，例如箭头函数、解构赋值、class，对一些新增api以及全局函数
（例如：Promise）无法进行转译，这个时候就需要在代码中引入babel-polyfill，让代码完美支持ES6+环境。
前面介绍的babel-node就会自动在代码中引入babel-polyfill包。
```

- 但很多时候我们并不会使用所有ES6+语法，全局添加所有垫片肯定会让我们的代码量上升，之后会介绍其他添加垫片的方式。

- `transform-runtime`(`transform-es2015-arrow-functions", //转译箭头函数`) 与 `babel-runtime` `helpers` 这种是按需进行 `polyfill` 无需全局引入 `babel-polyfill` 在一定程度上会减少代码体积

>  比较transform-runtime与babel-polyfill引入垫片的差异：
```
使用runtime是按需引入，需要用到哪些polyfill，runtime就自动帮你引入哪些，不需要再手动一个个的去配置plugins，
只是引入的polyfill不是全局性的，有些局限性。
而且runtime引入的polyfill不会改写一些实例方法，
比如Object和Array原型链上的方法，像前面提到的Array.protype.includes。

babel-polyfill就能解决runtime的那些问题，它的垫片是全局的，而且全能，
基本上ES6中要用到的polyfill在babel-polyfill中都有，它提供了一个完整的ES6+的环境。
babel官方建议只要不在意babel-polyfill的体积，最好进行全局引入，因为这是最稳妥的方式。

一般的建议是开发一些框架或者库的时候使用不会污染全局作用域的babel-runtime，
而开发web应用的时候可以全局引入babel-polyfill避免一些不必要的错误，
而且大型web应用中全局引入babel-polyfill可能还会减少你打包后的文件体积（相比起各个模块引入重复的polyfill来说）。


babel-polyfill 在项目代码前插入所有的 polyfill 代码，为你的程序打造一个完美的 es2015 运行环境。
babel 建议在网页应用程序里使用 babel-polyfill，只要不在意它略有点大的体积（min 后 86kb），直接用它肯定是最稳妥的。
值得注意的是，因为 babel-polyfill 带来的改变是全局的，所以无需多次引用，也有可能因此产生冲突，
所以最好还是把它抽成一个 common module，放在项目 的 vendor 里，或者干脆直接抽成一个文件放在 cdn 上。


回到应用开发。通过自动识别代码引入 polyfill 来优化看来是不太靠谱的，那是不是就无从优化了呢？
并不是。还记得 babel 推荐使用的 babel-preset-env 么？它可以根据指定目标环境判断需要做哪些编译。

babel-preset-env 也支持针对指定目标环境选择需要的 polyfill 了，只需引入 babel-polyfill，并在 babelrc 中声明 useBuiltIns，babel 会将引入的 babel-polyfill 自动替换为所需的 polyfill。

```

> babel-present-env 的参数 `useBuiltIns` 

```
1. 如果useBuiltIns为true，项目中必须引入babel-polyfill。
2. babel-polyfill只能被引入一次，如果多次引入会造成全局作用域的冲突。
做了个实验，同样的代码，只是.babelrc配置中一个开启了useBuiltIns，一个没有，两个js文件体积相差70k
https://github.com/Shenfq/studyBabel/tree/master/7-babel-env

useBuiltIns 可以根据之前的配置自行添加 polyfill，默认不开启。
安装 babel-polyfill 后只要引入一次就行：import "babel-polyfill";

```
- webpack2 的 tree shanking 技术
```
tree-shaking 都是因为 ES6 modules 的静态特性才得以实现的.
可以在编译阶段确定模块依赖

要在项目中使用这一技术需将 .babelrc 的 env 选项的 modules设为false， 即不需要babel处理es6模块，而交由webpack来处理
```

### 总结
- 由于有了 `babel-present-env` 才可以手动按需配置所需要的 `polyfill`
- `babel-present-env` 仅仅包括 `babel-present-2015、2016、2017`，不包括：`babel-stage-x`，也不包括 `babel-polyfill`
- `babel-present-env` 仅仅转换 新版的语法 如：`箭头函数`，并不转换新版api 如：`Array.include`
- 转换新版api及抹平浏览器之间的差异（兼容ie）需要 `babel-polyfill`



#### 参考文章

- [babel-present-env](http://blog.ttionya.com/article-1695.html)
- [babel配置详解](http://blog.ttionya.com/article-1695.html)
- [babel官网](https://www.babeljs.cn/docs/plugins/preset-env/)
- [jjc](https://segmentfault.com/p/1210000008466178)
- [babel-polyfill](https://zhuanlan.zhihu.com/p/27777995) 