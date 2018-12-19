# 动手实现 react-redux
- 通过 `store` 和 `context` 联系起来
- 问题
    * `有大量的重复逻辑`：他们的基本逻辑，取出 context，取出里面的store，然后用里面的状态设置自己的状态
    * `对 context 依赖性过强`：这些组件都要依赖context来取数据，使得这个组件复用性基本为零。

- `Pure Component` 与 `Dump Component`
- 需要高阶组件帮助我们从 context 取数据，我们也需要写 Dump 组件帮助我们提高组件的复用性
- 尽量多地写 Dump 组件，然后用高阶组件把他们包装一层，高阶组件和context打交道，把里面数据取出来通过 props传给 Dump组件
- `connect` 
- 我们把这个组件起名字叫 `connect` 因为他吧 Dump 组件和 context 连接起来了
- 但是每个传进去的组件需要 store 里面的数据都不一样，所以除了给高阶组件传入 Dump 组件以外，还需要告诉高阶组件我们需要什么数据，高阶组件才能正确取数据
- 为了解决上述问题，我们可以给高阶组件传递个 `mapStateToProps` 函数
```
const mapStateToProps = state => {
    return {
        themeColor: state.themeColor,
        themeName: state.themeName,
        fullName: `${state.firstName} ${state.lastName}`
    }
}
```

- `connect` 还没有监听数据变化后重新渲染，我们需要给 `connect` 的高阶组件增加监听数据变化重新渲染的逻辑

- `mapDispatchProps` , connect 函数既可以接收 `mapStateProps` 获取 store 数据，同样也可以 触发一个 dispatch

- 和 `mapStateToProps` 一样，他返回一个对象，这个对象内容同样被 `connect` 当作是 `props`参数传给被包装的组件。不一样的是，这个函数不是接受 state 作为参数，而是 `dispatch` ，你可以再返回的对象内部定义一些函数，这些函数会用到 `dispatch`来触发特定的 `action`

- `Provider`
- 我们需要把 context 相关的代码从所有业务组件中清除出去，现在代码里还有一个地方是被污染的。
- 其实他要用 context 就是因为要把 store  存放到里面，好让子组件 connect 的时候能取到 store。我们可以额外构建一个组件老坐着这个脏活，然后让这个组件称为组件树的根节点，那么它的子组件都可以获取到 context 
- `provider` 提供 `store`

### react-redux 总结