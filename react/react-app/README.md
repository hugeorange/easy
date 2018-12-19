### realsct 学习总结
> 使用 jsx 描述 UI信息

 - 从react.js 引入  React， 组件父类 component  `import React, { Component } from 'react'`   
 所有组件，都是继承自 Component （React.Component）

 - ReactDOM 可以帮助我们把 react 组件渲染到页面上（仅此一项作用）`import ReactDOM from 'react-dom'`  
 jsx ==> javascript 对象  

 `ReactDOM.render()` 方法就是把 react 组件渲染成 DOM 树，然后插入到页面的特定元素上

 1. JSX 是 JavaScript 语言的一种语法扩展，长得像 HTML ,但并不是HTML
 2. react.js 可以用 JSX 来描述你的组件长什么样
 3. JSX 在编译时会变成相应的 JavaScript 描述对象
 4. ReactDOM 负责把这个描述ui信息的 JavaScript 对象变成 DOM 元素，并渲染到页面上


 > React 组件的 render 方法
 - 编写组件时，一般要继承 React.Component   
   必须要有一个 render 方法，render 方法必须要返回一个 JSX 元素
-  在 jsx 当中 可以插入 JavaScript 表达式， 表达式用 `{}` 包裹
-  简而言之 `{}` 内，可以放任何JavaScript代码，包括变量，表达式计算，函数执行， render 会把这些表达式渲染的内容，如实的反应到页面上

- JSX 元素变量，jsx 可以像 JavaScript对象一样，自由的赋值给变量或者作为函数参数传递 

> 组件的组合、嵌套和组件树
- 自定义组件必须要用大写字母开头，普通的 html 标签都用小写字母开头
- 组件层层嵌套，形成一颗组件树

> 事件监听
- 没有经过特殊处理的话，这些 on- 的事件只能用在普通的 html 标签上，不能用在组件上
- react 中的 事件的 event 对象并不是浏览器原生的 event 对象，而是他自己内部构建的
- react 事件基本上和原生的浏览器事件一致并且不用考虑兼容性，也提供了类似 event.stopPropagation、event.preventDefault 的常用属性
- react.js 手动调用 bind 方法
- react 调用事件方法的时候，不是通过对象调用方式调用的，而是直接通过函数调用，所以事件监听函数并不能通过 this 获得实例
- 如果要想在事件监听函数中使用当前的实例，你需要手动将实例方法 bind 到当前实例然后在传递给 react.js
- 也可以在 bind 的时候，传递一些参数
```
  // react 点击事件传递参数方法

  constructor() {
    ['handler'].forEach((element) => {
      this[element] = this[element].bind(this);
    })
  }
  handler(param) {
    // param ...
  }
  render() {
    return (
      <div onClick={() => this.handler(param)}></div>
    )
  }

  // 或者, 因为这种bind绑定不建议使用了，所以这种传参方式也不建议使用了...
  render() {
    return (
      <div onClick={this.handler(param, e).bind(this)}></div>
    )
  }

```

> state , setState
- 当调用 setState 时，react.js 会更新 state  内容，然后重新调用 render 方法
- setState 接受一个 对象或函数作为参数
- 传入y一个对象的时候，这个对象表示这个组件的新状态，但你只需要传入这个对象更新的那部分就可以了，而不需要传入整个对象
- setState   当你调用 setState 的时候，react.js 并不会马上修改，而是把这个对象放到一个更新队列里，稍后才会把新的状态从队列中提取出来，合并到 state 中，然后再触发这个组件更新
- setState 接收一个函数作为参数，react.js 会把上一个 setState 的结果传入这个函数作为参数，你就可以使用该结果进行操作运算了
- 在使用 react.js 并不需要担心多次调用 setState 而产生性能问题，由于内部的 消息队列 render 方法只会执行一次

> 组件的 props
- 默认 props 利用 react.js 提供的 defaultProps = {} ，在 es6模块内部 用 static 关键字  static defaultProps = {}
- props 不可改变  ---》 单向数据流
1. 为了使得组件的可定制性更强，在使用组件的时候，可以在标签上加属性来传入配置参数。
2. 组件可以在内部通过 this.props 获取到配置参数，组件可以根据 props 的不同来确定自己的显示形态，达到可配置的效果。
3. 可以通过给组件添加类属性 defaultProps 来配置默认参数。
4. props 一旦传入，你就不可以在组件内部对它进行修改。但是你可以通过父组件主动重新渲染的方式来传入新的 props，从而达到更新的效果。

> state vs props 
- state 作用主要为 保存，控制，修改自己的状态；state 在组件内部初始化，可以被组件自身修改，外部既不能访问也不能修改
- state 为一个内部的，只能被组件自身控制的数据源；state 中的状态可以通过 this.setState() 方法进行更新，setState 会导致组件的重新渲染
- 
- props 的作用，让使用该组件的父组件可以传入参数来配置该组件，他是外部传进来的配置参数，组件内部无法控制，也无法修改，除非外部组件传入新的 props ，否则组件的 props 永不改变。

- 区分： state 是让组件控制自己的状态，props 是让外部组件对自己进行配置。

- 没有 state 的组件叫做 无状态组件
- 设置了 state 叫做 有状态组件

- 函数式组件： 只能接受 props 而无法像类组件一样可以再 constructor 里面初始化 state
- 无状态组件理解为：只能接受 props 和提供 render 方法的类组件

> 渲染列表数据页
- 如果我们向 jsx 里面放入一个数组，这个数组里又有一些 jsx 元素（其实就是 JavaScript 对象），react.js 会把 数组里面的元素一个个罗列出来，并且渲染出来。
- 使用 map 渲染列表数据,直接 在 jsx {}内， return 结果

> 实战--组件的划分
- 组件的划分没有标准。划分组件的目的是为了代码的可复用性，可维护性。 自顶而下，逐步求精的原则

- 表单元素
 * React.js 认为所有的状态都应该由 React.js 的 state 控制，只要类似于` <input />、<textarea />、<select /> `这样的输入控件被设置了 value 值，那么它们的值永远以被设置的值为准。值不变，value 就不会变化。
 * 必须要用 onChange 事件 ，监听表单元素，然后动态执行 setState 从而改变 state 的值，继而达到 ui 更新

> 评论系统小结
1. 实现功能之前，先理解分析需求，划分组件，并且掌握组件划分的基本原则---可复用性，可维护性
2. 受控组件的概念 React.js 中的 input，textarea，select，等元素的 value 的值，如果收到 react.js 的控制，那么就是受控组件
3. 组件之间使用 props 通过父元素传递数据的技巧。

> 前端应用状态管理 --- 状态提升
- 当某个状态被多个组件依赖或者影响的时候，就把该状态提升到这些组件最近的公共父组件中去管理，用 props 传递数据或者函数来管理这种依赖或者影响的行为。

> 组件生命周期 

> 挂载阶段的组件生命周期一
- 组件的挂载：React.js 将组件渲染，并且构造DOM元素，然后塞入页面的过程称为组件的挂载。 初始化组件--> 挂载到页面上
- 组件的方法调用是这么一个过程。 
- constructor - render - 构造DOM元素插入页面
- constructor - componentWillMount - render - 构造DOM元素插入页面 - componentDidMount

- 控制组件的显示/隐藏状态 ：{this.state.isShowHeader ? <Header /> : null}
- 组件隐藏即调用  componentWillUnmount 隐藏之前调用方法，组件销毁之前做清场动作

- constructor ： 组件的初始化动作，如初始化 state
- componentWillMount ： 启动组件动作，如 ajax 数据获取，定时器的启动
- componentWillUnmount：组件从页面上销毁时，有时候需要做一些数据清理，如定时器的清理
- componentDidMount：有些组件的启动是依赖 DOM 的，例如动画的启动，所以依赖 DOM 启动的组件，需要放在 componentDidMount

> 更新阶段 就是 setState 导致 react.js 重新渲染组件并且把组件的变化应用到DOM元素的过程，这是一个组件变化的过程。、
- 更新阶段-组件的生命周期
1. shouldComponentUpdate(nextProps,nextState) 通过这个方法控制组件是否重新渲染，如果返回 false 组件就不会重新渲染，这个生命周期在 react.js 性能优化时十分有用。
2. componentWillReceiveProps(nextProps) 组件从父组件接收到新的 props 之前调用
3. componentWillUpdate()  组件开始重新渲染之前调用
4. componentDidUpdate()   组件重新渲染并且把更改变更到真实的 DOM 之后调用

> ref 和 react.js 中的 DOM 操作
- 任何代表 html 元素的标签都可以接收一个 ref 属性，ref 属性值是一个函数，函数的参数是所需要的 DOM 元素，将该参数设置为组件实例的一个属性，即可 通过 this. 访问并获取到这个 DOM 元素
- 组件也可以有 ref 属性, 此 ref 属性获取到的是当前组件内部的实例 
```
  ref简介
  React提供的这个ref属性，表示为对组件真正实例的引用，其实就是 React.render() 返回的组件实例；
  需要区分一下，ReactDOM.render() 渲染组件时返回的是组件实例；而渲染dom元素时，返回具体的dom节点
  ref属性可以设置为一个回调函数，这也是官方强烈推荐的用法；这个函数的执行时机为：
  组件被挂载后，回调函数被立即执行，回调函数的参数为该组件的具体事例（可以调用该组件的内部方法）
  组件被卸载或者原有的ref属性本身发生变化时，回调函数也会被立即执行，此时回调函数参数为 null，以确保内存泄漏
  当回调函数执行时，必定能拿到 ref 的DOM元素
 ```
```
  ref 也支持接收一个 字符串 ，但强烈不建议使用，通过 `this.ref.string` 获得DOM元素
```
```
获取ref引用组件对应的dom节点
不管ref设置的值是回调函数还是字符串，都可以通过 React.findDOMNode(ref)来获取组件挂载后真正的dom节点
但是对于html元素使用ref的情况，ref本身引用就是该元素的实际dom节点，无需使用 ReactDOM.findDOMNode(ref) 来获取，该方法常用语React组件上的ref
```
```
ref在无状态组件中的使用
由于无状态组件不会被实例化，在父组件中通过ref获取无状态子组件时，其值为 null ，所以无法通过ref来获取无状态组件实例
可以通过一些变通的方法使用
```
> 参考文章 `https://segmentfault.com/a/1190000008665915`


> props.children 和 容器类组件
- this.props.children 可以访问到 该组件的内部嵌套的元素，可通过 this.props.children 访问，用于组件本身的书写
- 组件本身 里面访问组件嵌套的内容，，可以合理创造 dom 结构

>  dangerouslySetInnerHTML（属性，防止XSS攻击，显示 html 结构，富文本编辑器） 与 style 
-  属性：dangerouslySetInnerHTML={{__html: this.props.comment.content}}
-  style: <h1 style={{fontSize: '12px', color: this.state.color}}>React.js 小书</h1>

> React.PropTypes 和组件的参数验证
- react16会更新 PropTypes 不再建议使用 自带的验证器，再下一版本将会被移除
- 安装验证器 库 `npm install --save prop-types`

```
props-type提供的验证器

PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number
PropTypes.object
PropTypes.string
PropTypes.node
PropTypes.element

```
```
class xxx extends Component {
  //参数类型验证
  static propTypes = {
    comment:React.propTypes.object.isRequired
  }
  //传递默认参数
  static defaultProps = {
    comment:{xxx:Xxx}
  }
}
```
- 默认参数的类型验证列表
```
如果是非字符串直接报错 // 可以声明 prop 为指定的 JS 基本数据类型，默认情况，这些数据是可选的
任意类型加上 `isRequired` 来使 prop 不可空。
requiredFunc: React.PropTypes.func.isRequired,

不可空的任意类型
requiredAny: React.PropTypes.any.isRequired,
optionalArray: React.PropTypes.array,
optionalBool: React.PropTypes.bool,
optionalFunc: React.PropTypes.func,
optionalNumber: React.PropTypes.number,
optionalObject: React.PropTypes.object,
optionalString: React.PropTypes.string,

```

> 实战小贴士
- 组件的私有方法 ` _ ` 开头，所有事件监听的方法都以 ` handle `开头，把事件监听的方法传给组件时，属性名以 ` on `开头。
  例如 
  ```
    <ComponentInput onSubmit={this.handleSubmitComment.bind(this)}/>
  ```
- 另外，组件的编写顺序如下：

  1. static 开头的属性名； 如：`defaultProps` `propTypes`
  2. 构造函数 `constructor`
  3. getter/setter
  4. 组件生命周期方法
  5. `_`开头的私有方法
  6. 事件监听方法 `handle-*`
  7. `render-*` 开头的方法，有时候 render() 方法里面的内容会分到不同的函数里面进行，这些函数都以 `render-*`开头
  8. render 方法


> 高阶组件
- 高阶组件就是一个函数，传给踏一个组件，他返回一个新的组件。新的组件使用传入的组件作为子组件
  ```const NewComponent = highordercomponent(OldComponent)```
-  高阶组件的作用适用于代码复用，可以把组件之间可复用的代码、逻辑抽离到高阶组件当中，新的组件和传入的组件通过 props 传递信息

> React.js 的 context
- react.js 的 context ：某个组件只要往自己的 context 里面放了某个状态，这个组件之下的所有子组件都直接访问这个状态而不需要中间组件的传递。
- 一个组件的 context 只有他的子组件能够访问，他的父组件是不能够访问的。可以理解为每个组件的 context 是瀑布的源头，只能往下流，不能往上飞。
1. 一个组件可以通过 `getChildContext` 方法返回一个对象，这个对象就是子树的context，提供 context 的组件必须提供 `childContextTypes` 作为 context 的声明和验证。
2. 如果一个组件设置了 context，那么他的子组件都可以直接访问到里面的内容，他就像这个组件为根子树的全局变量。
   任意深度的子组件都可以通过 `contextTypes` 来声明你想要的 context 里面的哪些状态，然后可以通过 this.context 访问到哪些状态。
3. context 打破了组件之间通过 props 传递数据的规范，极大地减轻了组件之间的 耦合性。而且就如全局变量一样，context里面的数据能被随意接触就能被随意修改。每个组件都能改 context 里面的内容，会导致程序的运行不可预料。
4. redux 就是借助 context 来实现状态管理的。

> 动手实现 Redux（一） ：优雅的共享状态
- Redux 和 React-redux 并不是一种东西，Redux 架构模式是 Flux 的一种变种，Redux 可以和任何框架一起使用，React-redux 就是 Redux 在 React.js 上的实现

> 动手实现 Redux（二） 抽离 store 和监控数据变化
- store 集中处理 所有请求，如：获取数据，修改数据

> 纯函数（Pure Function）
- 一个函数的返回结果只能依赖于他的参数，并且在执行过程中没有副作用，我们就把这个函数叫做纯函数。
  1. 函数的返回结果只依赖于他的参数 （只能有参数是可变化的，全局变量等都是不允许的）
  2. 函数执行过程中没有副作用 (不得修改外部的变量，产生外部可观察的变化)
  3. 纯函数很严格，也就是说你除了计算数据以外，什么都不能干，计算的时候还不能依赖除函数参数以外的数据。

> Redux(四) 共享结构的对象提高性能
- 共享结构对象 ...  对象扩展运算符，浅复制
- 通过 比较新旧 state ，确定要渲染的对象，从而节约性能

> Redux(五) 不要要问为什么的 reducer
- createStore 创建 store 
  1. dispatch 修改数据
  2. getState 获取对象状态
  3. store.subscribe() 订阅数据修改事件，每次数据更新的时候自动渲染视图
- reducer 纯函数---初始化和计算新的state
  1. 负责初始 state，根据 state 和 action 计算共享结构的新的 state

- 技巧：
  1. 数组拓展运算符，对象拓展运算，合并数组，合并对象 [...state] {...obj} 
- createStore 套路
```
function createStore(reducer){
  let state = null;
  const listeners = [];
  const subscribe = (listen) => listeners.push(listen);
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state,action);  //覆盖原 state
    listeners.forEach((listen) => listen());
  }

  dispatch({});    //初始化 state
  return { getState,dispatch,subscribe }
}

//定义一个 reducer
function reducer(state,action){
  //初始化 state 和 switch...case  (action)
}

//生成 store
const store = createStore(reducer);

//监听数据变化，重新渲染页面
store.subscribe((action) => renderApp(store.getState()));

//首次渲染页面
 renderApp(store.getState())

//后面可以随意 dispatch，页面自动更新
store.dispatch({...})

```

> Redux 总结

> 实战 React-Redux
- 动手实现自己的 React-Redux 综合 context 和 store
- connect 和 mapStateToProps
- pure Component 和 Dump Component


> setState 坑
- 都知道setState是延迟运行的 它会等一阵子 集合几个setState运行一次 然后setState相关队列运行完后 会直接执行callback 这时候 界面render的时机 浏览器render界面的时机 是由浏览器控制的 那么就会出现callback执行了 界面确没有render的情况~
- callback刚好卡在 界面render与setState运行完之间

> 通用业务组件props类型检测、默认props
```
ImageEnhancer.PropTypes = {
  className: PropTypes.string,
  isImageVisiable: PropTypes.bool,
  imgUrl: PropTypes.string,
  needClose: PropTypes.string,
  callback: PropTypes.func,
  closeCallback: PropTypes.func,
  StatisticCategory: PropTypes.object, //增加埋点功能
};

ImageEnhancer.defaultProps = {
  needClose: true,
  StatisticCategory: {},
};

```