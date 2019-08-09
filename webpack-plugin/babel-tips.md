- npx babel src/babel --out-dir babel-dist

- [javaScript七日谈](https://huangxuan.me/2015/07/09/js-module-7day/)

---
- `从此处开始`
#### CommonJS 
- 简述
```
CommonJS 模块输出的是一个值的 拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值了
如果输出的是对象，改变其属性的话，外部引用的地方是会发生变化的
如果直接改变输出的引用，那外界引用的地方是不会变化的（取缓存里面的结果）

CommonJS 加载的是一个对象(即 module.exports 属性)，该对象只有在脚本运行完才会生成


commonjs 一个模块就是一个文件，require 命令第一次执行加载该脚本
就会执行整个脚本，然后在内存中生成一个对象

{
    id: '...', // 模块名
    exports: {}, // 真实的模块
    loaded: true // 是否加载完毕
}
以后再次 require 该模块时，就会去缓存里取该对象的 exports 的属性
无论 require 多少次，模块都只会运行一次，后续加载都是从缓存里面取

```
- `module.exports` 与 `exports` 的关系
```
exports 只是在初始化对 module.exports 的引用
初始化指向同一片内存空间

模块导出的是 module.exports 如果对 module.exports 重新赋值，exports 上，挂的方法/属性将会失效

require 引入的是 module.exports 导出的东西

为避免混乱/错误，一般导出模块只建议用 module.exports 

一般第三方包都用这种方式导出 `modules.exports = exports = {}`
```
- 循环引用问题 （`某个模块出现循环加载，就只输出已经执行的部分，还未执行的部分不会输出`）
```
// 代码如下
// a.js
exports.A = '我是a模块';

var b = require('./b.js');
console.log('在 a.js 之中， 输出的 b模块==> ', b.B);

exports.A = '我是后期修改过的a模块';

console.log('a.js 执行完毕');

// b.js
exports.B = '我是b模块';

var a = require('./a.js');
console.log('在 b.js 之中，输出a模块 ==>', a.A);

exports.B = '我是修改后的b模块';
console.log('b.js 执行完毕');

// main.js
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中,输出的 a模块=%j, b模块=%j', a.A, b.B);

// 输出结果如下：
➜  webpack-plugin git:(master) ✗ node src/babel/index 
在 b.js 之中，输出a模块 ==> 我是a模块
b.js 执行完毕
在 a.js 之中， 输出的 b模块==>  我是修改后的b模块
a.js 执行完毕
在 main.js 之中,输出的 a模块="我是后期修改过的a模块", b模块="我是修改后的b模块"


// 执行过程如下：
执行 a.js 遇到 require b.js，暂停 a.js 执行，去执行 b.js

b.js 执行到第二行，遇到 require a.js ，从缓存中拿出刚刚 a.js 导出的模块，在 b.js 里面使用
继续执行 b.js 后面的代码

待 b.js 执行完毕后，控制权交还 a.js，继续执行

拿到 b.js 导出的模块，在 a.js 继续使用 

... 直到结束 


```

- `循环引用注意点`：由于 commonjs 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是全部代码之后的值，两者可能会有差异，所以输入变量的时候必须非常小心，使用 `var a = require('a')` 而不是 `var a = require('a').foo`



#### ES6 Module
- 基本使用
```
export default A // 用户不需要知道导出模块的变量名
import a from 'a.js'

// 可以导出多个
export var a = 1 // 这种方式可以直接导出一个表达式
或
var a = 1
export {a}  // 必须用花括号包起来

import {a} from 'a.js'

// as 关键字重命名模块
export { a as A }

// 导入导出合并
export { default as Comps } from '../xxx'
相当于
import Comps from './xx'
export { Comps }

// 执行 loadsh 模块，但并不输出任何值
import 'lodash';

// 整体加载所有模块，访问时用 circle.xxx 访问
import * as circle from './circle';

```
- `简述:` ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入，它的接口只是一种静态定义，在代码静态解析阶段就会生成。

```
// ES6模块
import { stat, exists, readFile } from 'fs';
上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。
这种加载称为“编译时加载”或者静态加载，
即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。
当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。


由于 ES6 模块是编译时加载，使得静态分析成为可能

import命令具有提升效果，会提升到整个模块的头部，首先执行
import命令是编译阶段执行的，在代码运行之前。

由于 import 是静态执行，所以不能使用表达式和变量（这类只有在运行时才能得到结果的语法结构）

静态加载模块的好处：
1. 不再需要UMD模块
2. 浏览器API可以用模块格式提供，不必再做成全局变量，不再需要全局对象如：Math (可以像Python一样用模块倒入)
```
- `动态 import`
```
动态import() 是非常有用的。而静态型的 import 是初始化加载依赖项的最优选择，
使用静态 import 更容易从代码静态分析工具和 tree shaking 中受益

import(模块路径) 返回 promise，从 then 的结果里拿到加载的模块

webpack 2.x 之后，有一个魔力注释的功能，会把加载的模块重命名为你注释里的文字

```

#### CommonJS 与 ES Module 的对比
```
// 此处是对比

- CommonJS 模块时运行时加载，ES6模块时 编译时 输出接口

ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。
等到真的需要用到时，再到模块里面去取值，
换句话说，ES6的输入有点像Unix系统的“符号连接”，原始值变了，import输入的值也会跟着变。
因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
```

#### Babel 转换 ES6 的模块化语法
```
Babel 的作用之一就是将 ES6 转换成 CommonJS 规范

模块输出语法转换
Babel 对于模块输出的转换，就是把所有输出都赋值到 exports 对象的属性上，并加上 ESModule: true 的标识
表示这个模块是由 ESModule 转换来的 CommonJS 输出

对于解构赋值输入
import {a} from './a.js'
转义为
var _c = require('./a.js')
然后取 _c.a 

对于 default

import a from './a' ==> import {default as a} from './a'

babel转义时的处理
引入了一个 函数
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj}
}

var _a = _interopRequireDefault(require("./a.js"));
console.log(_a["default"]);
// 意思就是如果不是 esmodule 就为其手动添加个 default 属性，取值时统一取 default
```


- babel 为什么 会把 `export export.default` 导出的模块转换为 `exports.xxx 和 exports.default` 呢

- 命令行翻墙

#### 简述
- es6 模块 -- 动态更新
- commonjs -- 值的缓存不存在动态更新
- es6 模块 import 和 export 必须出现在模块顶层，如果处在条件判断代码中，就没法做静态化了
- import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。（否则会报错）
- import 是编译阶段执行的，他会早于模块内的所有代码先执行
- import * as xxx from '../xx'

- ES6 模块
```
import {a} from './xxx.js'

a.foo = 'hello'; // 合法操作

但经过 babel 转义后，就不允许 动态设置新的属性了

会报错


commonjs 不会报错，但也不会影响原模块
```

- `ESModule 与 CommonJS 的关系`
- 在 `webpack` 构建之后，都变成了 ----