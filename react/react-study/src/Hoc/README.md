# 高阶组件 HOC 的使用
> 常见的HOC实现方式
1. 基于属性代理（Props Proxy）的方式
- 属性代理是最常见的高阶组件的使用方式，上面所说的高阶组件就是这种方式。它通过做一些操作，将被包裹组件的props和新生成的props一起传递给此组件，这称之为属性代理。

2. 基于反向继承（Inheritance Inversion）的方式

