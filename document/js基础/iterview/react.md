# React
- react 基本形式
```
class H extends React.Component {
    render() {
        return (
            <div>hello world</div>
        )
    }
}

ReactDOM.render(<H/>, document.body)
```
- [React](#react)


- React 组件的变化是基于状态的，状态通过 props 在各组件中传递

- React 生命周期
```
// 即将出生，刚开始调用
componentWillMount() 

// 出生（开始渲染，准备初始数据，调用 render方法）
constructor(props) {
    super(props);
}

// 出生完毕（调用 render 完成并渲染到页面上）
componentDidMount()

// 接收了新的属性
componentWillReceiveProps(nextProps) {
    // nextProps 即传过来的新 props
    // 换了新名字，固定的属性
    if(nextProps.name !== this.state.name) {

    }
}

// 要重新渲染(准备过生日)
componentWillUpdate()

// 更新渲染完成（过完生日）
componentDidUpdate

// 要火化了，组件销毁 
componentWillMount()
```
```
H.PropTypes = {
  props默认值
};

H.defaultProps = {
  props类型
};
```



- 每一次 props 或者 state 改变，都会重新渲染组件，，为了阻止渲染，React还提供了 `shouldComponentUpdate` 方法，在 render 钱判断是否有必要执行 render 提升性能
- 比较两次的传进来的值是否相等，若是 return false ，阻止再次render，否则就 return true
```
// nextProps 下一次的props，下一次的 state，该方法默认返回true， this.props 还是当前的props
shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(this.props, nextProps) || !_.isEmpty(this.props)) {
        return false
    }
    return true
}
```


- 总结：
1. props 用来传递数据，state 用来存储组件内部的状态和数据。props 是只读的，state 当前组件 state 的值可以作为 props 传递给下层组件。
2. React 组件按照生命周期运行，改变 state 就会重新执行 render 方法。render 方法返回的是一段 JSX 语法的结构用来渲染到页面上。


### React ref 
```

/**
 * ref简介
 * React提供的这个ref属性，表示为对组件真正实例的引用，其实就是 React.render() 返回的组件实例；
 * 需要区分一下，ReactDOM.render() 渲染组件时返回的是组件实例；而渲染dom元素时，返回具体的dom节点
 * ref属性可以设置为一个回调函数，这也是官方强烈推荐的用法；这个函数的执行时机为：
 * - 组件被挂载后，回调函数被立即执行，回调函数的参数为该组件的具体事例（可以调用该组件的内部方法）
 * - 组件被卸载或者原有的ref属性本身发生变化时，回调函数也会被立即执行，此时回调函数参数为 null，以确保内存泄漏
 * 当回调函数执行时，必定能拿到 ref 的DOM元素
 */

```

### React input
```

// 填充input数据
handleUsernameChange(e){
    this.setState({
        username:e.target.value
    });
}

// JSX
<input 
    value={this.state.username} 
    onBlur={this.handleUsernameBlur.bind(this)} 
    onChange={this.handleUsernameChange.bind(this)} 
    placeholder="请输入用户名"
/>

React.js 认为所有的状态都应该由 React.js 的 state 控制，只要类似于<input />、<textarea />、<select />这样的输入控件被设置了 value 值，那么它们的值永远以被设置的值为准。值不变，value 就不会变化。
必须要用 onChange 事件 ，监听表单元素，然后动态执行 setState 从而改变 state 的值，继而达到 ui 更新

```

### React 父子组件通信 

* 父 ——> 子  通过传递 props 即可
* 子 ——> 父  父组件传递回调函数给子组件，子组件调用触发即可

```
// 父组件 
class Parent extends React.Component {
    handler(param) {
        ...
    }
    render() {
        return (
            <Child handleAction={this.handler.bind(this)}/> 
        )
    }
}

class Child extends React.Component {
    render() {

        return (
            <div onClick={this.props.handleAction(param)}></div>
        )
    }
}
```