import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var myStyle = {
  color:"green",
  fontSize:50
}
var myArr = [
  '我是展开数组的第一个成员',
  '我是展开数组的第二个成员'
]


/*
 * 封装一个 helloworld 组件
 * react 的 jsx 使用大小写的约定来区分本地的类和HTML标签
 * 由于jsx 就是 JavaScript，一些标识符，class for 不建议作为XML的属性名，作为代替 ReactDom使用 className 和 htmlFor来做对应的属性
*/ 

//自定义封装的 react 组件
/**
 * React.createClass 方法用于生成一个组件类 HelloMessage。
 * 原生 html 标签以小写字母开头，而自定义 React 类名以大写字母开头比如 HelloMessage 不能写成 hellomessage
 * 除此之外还要注意组件类只能包含一个 顶层标签
 */

/**
 * 通过 this.props.name 访问组件传递来的参数
 * 注意：再添加属性时class 要写成 className， for要写成 htmlFor
 * 因为 class 和 for 是  js 的保留字
 */

var HelloMessage = React.createClass({
  render:function(){
    return <h1>hello world { this.props.name } { this.props.aaa }</h1>
  }
});





/**
 * state 状态机
 * react 把组件看成一个状态机（state Mchines）
 * 通过与用户的交互实现不同的状态，然后渲染 ui， 让用户页面和数据保持一致
 * react 只需要更新组件的 state， 然后根据新的 state 重新渲染渲染用户界面（不需要DOM）
 * 以下实例中创建了 LinkButton 组件 
 * getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取
 * 当用户点击时导致组件变化， 
 * this.setState 方法就修改状态值，每次修改以后自动调用 this.render 方法，再次渲染组件
 */

var LikeButton = React.createClass({
  getInitialState:function(){
    return {liked:false};
  },
  handleClick:function(){
    this.setState({ liked : !this.state.liked });
  },
  render:function(){
    var text = this.state.liked ? '喜欢' : '不喜欢';
    return (
      // onClick 等事件，与原生 HTML 不同，on 之后的第一个字母是大写
      <p onClick={this.handleClick}>
        你 {text} 我。点击切换标签
      </p>
    )
  }
});

/**
 * ReactProps
 * state 和 props 的主要区别在于 props 是不可变的
 * 而 state 可以根据用户的交互而改变
 * 这就是为什么有些容器的组件需要定义 state 来g更新和修改数据
 * 而组件只能通过 props 来传递数据
 */

/**
 * 设置默认的 props 值
 * 通过 getDefaultProps() 方法为 props 设置默认值
 */
var Hellomsg = React.createClass({
  getDefaultProps:function(){
    return {
      name:"菜鸟"
    }
  },
  render:function(){
    return (
      <h5>hello  {this.props.name} </h5>
    )
  }
});

/**
 * 使用 state 和 props
 * 我们可以在父组件中设置 state ，并通过子组件中设置 props，将其传递到子组件上
 * 在render 函数中，我们通过 设置 name 和 site 来获取父组件传递过来的数据
 */

/**
 * 复合组件--可以创建多个组件来合成一个组件即把组件的不同功能点分离
 * Website 组件使用了 Name 和 Link 组件来输出对应的信息，也就是说 Website拥有 Name 和 Link的实例
 * 父组件内定义 state 状态
 * 子组件通过 props 接收父组件的传值
 */

var Name = React.createClass({
  render:function(){
    return <span>{this.props.name}</span>
  }
});

var Link = React.createClass({
  render:function(){
    return <span>{this.props.name}</span>
  }
});


var Website = React.createClass({
  getInitialState:function(){
    return {
      name:'菜鸟教程',
      site:'http://www.runoob.com'
    }
  },
  render:function(){
    return (
      <div>
        <Name name={this.state.name}/>
        <Link name={this.state.site}/>
      </div>
    );
  }
});

/**
 * props 验证  系统自定义验证器
 * props 验证使用 propsTypes 他可以保证我们的应用组件被正确使用
 * React.PropTypes 提供很多验证器（validator）来验证传入的数据是否有效
 * 当传入无效数据时，JavaScript会爆出警告
 * 以下实例是创建一个 Mytitle 组件，属性title 必须是字符串，非字符串会自动转换为字符串
 */

var title = "菜鸟教程";
// var title = 123;

var Mytitle = React.createClass({
  propTypes:{
    // 如果是非字符串直接报错 // 可以声明 prop 为指定的 JS 基本数据类型，默认情况，这些数据是可选的
    // 任意类型加上 `isRequired` 来使 prop 不可空。
    // requiredFunc: React.PropTypes.func.isRequired,
    // 不可空的任意类型
    // requiredAny: React.PropTypes.any.isRequired,
    // optionalArray: React.PropTypes.array,
    // optionalBool: React.PropTypes.bool,
    // optionalFunc: React.PropTypes.func,
    // optionalNumber: React.PropTypes.number,
    // optionalObject: React.PropTypes.object,
    // optionalString: React.PropTypes.string,

    title:React.PropTypes.string.isRequired
  },
  render:function(){
    return (
      <h1>{this.props.title}</h1>
    )
  }
});


/**
 * react API
 * 设置状态：setState
 * 替换状态：replaceState
 * 设置属性：setProps
 * 替换属性：replaceState
 * 强制更新：forceUpdate
 * 获取DOM节点：findDOMNode
 * 判断组件挂载状态：isMounted
 */


/**
 * 设置状态
 * setState(object nextState [,function callback])
 * nextState 将要设置的新状态，改状态回合 当前的 state 合并
 * 可选参数，当状态设置成功后且组件重新渲染后调用 
 * 合并 nextState 和 state，并重新渲染组件，setState 是react中事件处理函数中和请求回调函数中触发 UI的主要方法
 * 
 * 关于 setState
 * 不能在组件内部通过 this.state 修改状态，因为该状态会在调用 setState 后被替换
 * setState() 并不会立即改变 this.state 而是创建一个即将处理的 state
 * setState() 并不一定是同步的，为了提升性能，react 会批量处理执行 state 和 DOM渲染，如果一些逻辑在其需要在其之后处理，需设置 callback 选项 
 * setState() 总是会触发一次组件重绘，除非在  shouldComponentUpdate() 实现了一些条件渲染逻辑，比如 设置返回值为 false ，即可阻止渲染
 */

var Counter = React.createClass({
  getInitialState:function(){
    return { clickCount:0 }
  },
  handleClick:function(){
    // this.setState(function(state){
    //   return {clickCount:state.clickCount + 1}
    // },function(){
    //   console.log('我是setState触发后的更新');
    // })
    this.setState(
      //可以用函数 return 对象，也可以直接写一个函数 
      {clickCount:this.state.clickCount + 1},
      function(){
        console.log('我是setState触发后的更新');
      }
    )
  },
  render:function(){
    return (
      <div onClick={this.handleClick}>点击次数{this.state.clickCount}</div>
    )
  }
});

/**
 * 替换状态 replaceState
 * replace(object nextState,[,function callback])
 * nextState 将要设置的新状态，改状态会替换当前的state
 * callback 可选参数，该函数会在 replaceState 设置成功，且组件重新渲染后使用
 * replaceState() 和 setState() 方法类似，
 * 但是该方法只会保存 nextState 中的状态，原 state 不在 nextState 中的状态都会被删除
 */


/**
 * setProps 设置属性
 * setProps(object nextProps [,function callback])
 * nextProps 将要设置的新属性，该状态会和当前Props 合并
 * callback 回调函数，该函数会在 setProps 设置成功后，且组件组件重新渲染后调用
 * 
 * 设置组件属性，并重新渲染组件
 * props 相当于组件的数据流，它总是会从父组件向下传递至所有的子组件
 * 当和一个 外部的JavaScript应用集成时，我们可能会向组件传递数据或通知 react.render() 组件需要重新渲染，可以使用 setProps
 * 更新组件时，我们可以在节点上再次调用 React.render() ，也可以设置 setProps() 方法改变子组件属性
 */

/**
 * 替换属性 replaceProps
 * replaceProps(object nextProps [,function callback])
 * nextProps 将要设置的新属性，该属性会代替 当前的 props
 * callback 回调函数，该函数会在 replaceProps 调用成功后，且组件重新渲染后调用
 * replaceProps 和 setProps 方法类似，但会删除原有 props
 */

/**
 * forceUpdate 强制更新
 * forceUpdate([function callback])
 * callback 回调函数，该方法会在 render 方法调用后调用
 * forceUpdate ，该方法会使组件调用自身的 render 方法，重新渲染组件子组件也会调用自身的 render 方法
 * 重新渲染时依然会读取 this.props 和 this.state ,如果状态没改变，react 只会更新 DOM
 * forceUpdate 适用于 this.state this.props 之外的组件重绘，（如：修改了 this.state 后）
 * 通过该方法通知 react 需要调用 render()
 * 一般来说：应该尽量避免使用 forceUpdate ，而仅从 this.props 和 this.state中读取状态，并有 react 触发 render
 */

/**
 * 获取 DOM 节点，findDOMNode
 * DOMElement findDOMNode()
 * 返回值 dom 元素的 DOMElment
 * 如果组件已经挂载到 DOM中，该方法返回本地浏览器的DOM元素。
 * 当 render() 方法返回 null 或 false 时，this.findDOMNode 也会返回 null 
 * 从 DOM中取值时，该方法会很好用
 * 如获取表单字段的值时，和做一些 DOM 操作
 *
 *
 * 和 ref 的区别，以及  ref string 与 ref callback 的写法
 * 
 */

class Child_ref extends React.Component {
  render() {
    return <p>child</p>
  }
}



class App_ref extends React.Component {
  render() {
    return (
      <div>
      
        <div ref={div => {this._div = div}}> ref callback写法 </div>
        <div ref="refdiv"> ref-string 写法  </div>
      
        <Child ref={child => this._child = child}/> 
      
        <button onClick={()=> {
          console.log(this._div);     //返回 原生 ---  DOM结构
          console.log(this._child);   //返回 待测试......
      
          console.log(ReactDOM.findDOMNode(this._div) === this._div);  // true
          console.log(ReactDOM.findDOMNode(this._child));              // 返回原生 --- DOM 结构
        }}>
          log refs
        </button>
      </div>

    )
  }
}





/**
 * 判断组件挂载状态  isMounted
 * bool isMounted
 * 返回值 true/false  组件是否已经挂载到 DOM中
 * isMounted 判断组件是否已经挂载到 DOM 中
 * 可以使用该方法保证 setState() forceUpdate() 在一步场景下不会出错
 */



/**
 * react 组件的生命周期
 * Mounting ：已插入真实的 DOM
 * Updating：正在被重新渲染
 * Unmounting：已移除真实 DOM
 *
 * constructor 执行一次
 * 声明周期的方法有：
 *      初始化时调用的钩子函数
 * 1.   componentWillMount 在渲染前调用，在客户端也在服务端（该 hook 很少使用，所有里面的方法均可以在，construcor 里面调用，仅是为了和 Did对应）
 * 2.   调用初始化 render 函数里面的内容
 * 3.   componentDidMount 在第一次渲染后调用，只在客户端，之后组件已经生成了一个 DOM结构可以通过 this.getDOMNode 来访问
 *      如果你想和其他JavaScript框架一起使用，可以在方法中调用  setTimeout 、ajax（防止异步操作阻塞 UI）
 *
 *     当改变 props 或者 state(此改变没有第一个hook)  值时，会再次渲染组件
 * 1.  componentWillReciveProps(nextProps) 在组件接收一个新的 prop 时被调用，这个方法在初始化 render 时不会调用
 * 2.  shouldComponentUpdate(nextProps,nextState) 返回一个布尔值，在组件接收新的 props 或者 state 时被调用，
 *     返回一个布尔值，用来决定是否还需要渲染 react 组件，如果按照业务逻辑某种情况下不需要重新渲染，不执行以下过程react 组件，就 返回 false，
 *     否则返回 true
 *
 * 
 *     在初始化时或者 forceUpdate时不会被调用，可以在你确认不需要更新组件时使用
 * 3.  componentWillUpdate    在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
 * 4.  再次调用 render 函数，渲染组件
       在更新完真正的DOM后调用
 * 5.  componentDidUpdate   在组件完成更新后立即调用。在初始化时不被调用
 *
 *
 *     移除组件  componentWillUnmount 在组件从 DOM中移除的时候立刻被调用
 *     此阶段就是释放页面做的一些绑定，释放内存
 *
 *    this.forceUpdate()   组件强行重绘一次
 *    <button onClick={ () => this.forceUpdate() }> 强行组件重绘一次! </button>
 *
 *
 */


/**
 * react 表单元素
 */
var Formelement = React.createClass({
  getInitialState:function(){
    return {value:"hello 菜鸟教程"};
  },
  handleChange:function(e){
    this.setState({value:e.target.value});
  },
  render:function(){
    var value = this.state.value;
    return (
      <div>
        {/* 没有 onChange 事件，input 不可设置初始值，也不能输入值 */}
        <input value={value} onChange={this.handleChange}></input>
        {/* <input value={value} ></input> */}
        
        <p>{value}</p>
      </div>
    )
  }
});

/**
 * 在父组件上创建事件句柄，并作为 prop 传递到你的子组件上
 * 当你需要从子组件更新父组件 state 状态时，你需要在父组件中创建事件句柄（handlechange）
 * 并作为 prop （updateStateProp）传递到你的子组件上
 */

// 子组件
var Content = React.createClass({
  render:function(){
    return (
      <div>
        <input type="text" value={this.props.myDataProp} onChange={this.props.updateStateProp}/>
        <h3>{this.props.myDataProp}</h3>
      </div>
    )
  }
});

// 父组件
var HelloMsg1 = React.createClass({
  getInitialState:function(){
    return {value:"hello 世界"}
  },
  handleChange:function(e){
    this.setState({value:e.target.value});
  },
  render:function(){
    var value = this.state.value;
    return (
        <Content myDataProp={value} updateStateProp={this.handleChange}/>
    )
  }
})


/**
 * react ref 
 * React 支持一种非常特殊的属性，你可以用来绑定到 render() 输出的任何组件上
 * 这个特殊的属性允许你引用 render() 返回相应的支撑实例，这样就能确保在任何时候拿到正确的实例
 * 使用方法：绑定一个 ref 属性 到 render 的返回值上
 * <input ref="myInput">
 * 在其他代码中 通过 this.refs.myInput 获取支撑实例
 */

var MyrefComponent = React.createClass({
  handleClick:function(e){
      //使用原生 DOM api 获取节点
      this.refs.myInput.focus();
      // this.getDOMNode();
  },
  render:function(){
    return (
      <div>
        <input type="text" ref="myInput"/>
        <button onClick={this.handleClick}>获取焦点</button>
      </div>
    )
  }
});


/**
* ES6 class 创建组件
*
* React 组件需要构造函数的目的：
* 1.初始化 state ，因为生命周期里面的每个方法都有可能访问 state， constructor 是初始化 state 的理想场所
* 2.绑定成员函数的 this 环境
*
* 与 React.createClass({ ... }) 创建组件的区别
* 1. 没有 getInitialState 和 getDefaultProps 两个初始化方法
*
**/


//  ES6 模块写法
class Es6Component {
  constructor(props) {
    super(props);     // 以后随处使用 this.props， props 为数据源，不可被改变，state 为组件状态
    this.state = {    // 初始化 state 
        xxx:"xxxx"
    }   
  }
  handleClick() {

  }
  render() {
    //ES6组件 绑定 事件时必须要绑定作用域，否则 this 指向 null
    return (
      <div onClick={this.handleClick.bind(this)}></div>
    )
  }
}

Es6Component.sampleProps = {
    xxxx:'xxx'
}

//  React.createClass({ ... })  写法,,,官方不推荐此种写法
const CreateClass = React.createClass({
   getInitialState(){
      return {
         xxx:"xxx"
      }
   },
   getDefaultProps(){
     return {
       xxx:"xxx"
     }
   }
})







/**
* 父子组件沟通
* 父 ——> 子  通过传递 props 即可
* 子 ——> 父  父组件传递回调函数给子组件，子组件调用触发即可
* 兄弟组件沟通 （两个组件有相同的父组件就称为兄弟组件，堂兄也算）
* 1. 借助父组件回调函数，传递 props
* 2. 如果组件层次嵌套太深，就不适合上述写法
*    React 提供了一种上下文式，可以让子组件直接访问祖先组件的函数或数据，无需从祖先组件一层层的传递到子组件
*
* 3. Redux 等一些状态管理库
*/


/**
*  props 用于定义外部接口，state 用于定义内部状态
*  组件不应该改变 props ，而 state 存在的目的就是用来改变的
*/


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 style = {myStyle}>Welcome to React</h2>
          <div>{myArr}</div>
          <HelloMessage name="菜鸟教程" aaa="我是aaa"/>
          <h2>Welcome to 菜鸟教程</h2>
          <h2>Welcome to hugeorange</h2>
          <Website/>
          <LikeButton/>
          <Hellomsg name="教程"/>
          <Mytitle title={title}/>
          <Counter/>
          <Formelement/>
          <HelloMsg1/>
          <MyrefComponent/>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
