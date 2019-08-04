./node_modules/.bin/babel src --out-dir lib
npx
npx babel src/babel --out-dir babel-dist

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