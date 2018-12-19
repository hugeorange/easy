## React Context API 
- https://juejin.im/post/5a90e0545188257a63112977
- 解决组件间的传值问题

> 几个可以直接获取Context的地方
- 实际上，除了实例的context属性(this.context)，React组件还有很多个地方可以直接访问父组件提供的Context。比如构造方法：

- constructor(props, context)

比如生命周期：

1. componentWillReceiveProps(nextProps, nextContext)
2. shouldComponentUpdate(nextProps, nextState, nextContext)
3. componetWillUpdate(nextProps, nextState, nextContext)
4. 对于面向函数的无状态组件，可以通过函数的参数直接访问组件的Context。

```
const StatelessComponent = (props, context) => (
  ......
)
```

### context 的理解
- 通过Context暴露数据或者API不是一种优雅的实践方案，尽管react-redux是这么干的。因此需要一种机制，或者说约束，去降低不必要的影响。
- 通过`childContextTypes`和`contextTypes`这两个静态属性的约束，可以在一定程度保障，只有组件自身，或者是与组件相关的其他子组件才可以随心所欲的访问Context的属性，无论是数据还是函数。

- 因为只有组件自身或者相关的子组件可以清楚它能访问`Context`哪些属性，而相对于那些与组件无关的其他组件，无论是内部或者外部的 ，由于不清楚父组件链上各父组件的`childContextTypes`“声明”了哪些`Context`属性，所以没法通过`contextTypes`“申请”相关的属性。所以我理解为，给组件的作用域`Context`“带权限”，可以在一定程度上确保`Context`的可控性和影响范围。

- `作为React的高级API，React并不推荐我们优先考虑使用Context。`

1. Context目前还处于实验阶段，可能会在后面的发行版本中有大的变化，事实上这种情况已经发生了，所以为了避免给今后升级带来较大影响和麻烦，不建议在App中使用Context。
2. 尽管不建议在App中使用Context，但对于组件而言，由于影响范围小于App，如果可以做到高内聚，不破坏组件树的依赖关系，那么还是可以考虑使用Context的。
3. 对于组件之间的数据通信或者状态管理，优先考虑用props或者state解决，然后再考虑用其他第三方成熟库解决的，以上方法都不是最佳选择的时候，那么再考虑使用Context。
4. Context的更新需要通过setState()触发，但是这并不是可靠的。Context支持跨组件访问，但是，如果中间的子组件通过一些方法不响应更新，比如shouldComponentUpdate()返回false，那么不能保证Context的更新一定可达使用Context的子组件。因此，Context的可靠性需要关注。不过更新的问题，在新版的API中得以解决。

> 简而言之，只要你能确保Context是可控的，使用Context并无大碍，甚至如果能够合理的应用，Context其实可以给React组件开发带来很强大的体验。

> React-router 中的路有对象就是通过 Context 传递的

> 使用 Context 开发插槽 组件

### 总结
```
老版本 Context API 通过在生产者主动声明 context

    getChildContext () {
        return {
            propA: 'propA',
            methodA: () => 'methodA'
        }
    }
    static childContextTypes = {
        propA: PropTypes.string,
        methodA: PropTypes.func
    }

然后在消费者里面也要主动声明使用

static contextTypes = {
    propA: PropTypes.string,
    methodA: PropTypes.func
}
```

```
新版本 Context API
通过 React.createContext 创建一个 context

const ThemeContext = React.createContext();

再生产这里面 通过 Provider 创建生产者 context 内容
<ThemeContext.Provider value={{background: 'green', color: 'white'}}>
    <Header />
</ThemeContext.Provider>

在后代组件里，通过 Consumer 接收一个函数参数为 context ，返回一段 JSX
<ThemeContext.Consumer>
    {context => {
        return (
            <h1 style={{background: context.background, color: context.color}}>
                {this.props.children}
            </h1>
        )
    }}
</ThemeContext.Consumer>
```

- 新版本 context 可随 state props 变化一起进行 rerender
- 老版本 context 一旦定了不可改变

### 一点疑惑
- 新版本的 context API 如何在组件生命周期钩子里使用 context，如何在无状态函数组件里面使用 context

