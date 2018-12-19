# webpack-react

> 基于 webpack + React16 + react-router4 + postcss 搭的一个中后台管理页面的架在

> code spliting
- 异步加载组件-code spliting  loadable 解决

> history
- react-router4 的 history 对象，
- react-router-dom提供的 BrowserRoute 组件并没有暴露出 history对象，如果在路由组件的孙子及以下组件，通过 props并不能获取 history 对象， 所以需要 history 库做个 hack
- 解决这个问题的三种办法
- https://github.com/YutHelloWorld/Blog/issues/5
- https://juejin.im/entry/59b9552b6fb9a00a5b1a87af
> rr2、3的 browserHistory 与 rr4
```
rr2、3中的的 browserHistory 与 rr4 的 history/createBrowserHistory;

两个版本的路由非路由组件的非直接子组件中均无法使用 this.props 获取路由对象

前者 react-router2、3 暴露出了 browserHistory 对象，可以利用其进行操作路由
rr4 的 react-router-dom 并没有暴露出类似的对象，在路由孙子及以下组件无法进行路由操作
rr4 的解决方案：官方推荐 使用  withRoute

hack 方法，引入 history包，用history替换 rr4的 <BrowserRouter/>
<Router history={BrowserHistory}> // BrowserHistory 即为history库中的对象
使用了 history ，依然可以在路由子组件中获取 react-router 提供的路有对象


```
---

待解决问题：
1. 试验 rr2 的 this.props.location 与 BrowserHistory 是否有区别， 
   history对象中的 key 起什么作用？
2. react context api，v16与v15的区别
3. ES6 rest 用法
4. vue 切路由时列表页的位置还固定着，REACT就初始化了，怎么解决
4. HOC
5. redux


---
... 完善后台管理架子
