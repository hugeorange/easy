## REACT 学习
1. context 练习
2. React.PureComponent ***
3. React-redux 
4. es6 通读一遍

## React.PureComponent 
- [React.PureComponent](https://www.zcfy.cc/article/why-and-how-to-use-purecomponent-in-react-js-60devs)
- react15.3 新增的组件，用来简化代码书写，替代 `pure-render-mixin`
- `PureComponent`改变了生命周期方法`shouldComponentUpdate`，并且它会自动检查组件是否需要重新渲染。
```
正常情况下性能优化需要用 shouldCompoentUpdate
if (this.state.someVal !== computedVal) {
  this.setState({ someVal: computedVal })
}

根据React源码，如果组件是纯组件(Pure Component)，那么一下比较是很容易理解的：
if (this._compositeType === CompositeTypes.PureClass) {
  shouldUpdate = !shallowEqual(prevProps, nextProps) || ! shallowEqual(inst.state, nextState);
}
其中，shadowEqual只会"浅"检查组件的props和state，这就意味着嵌套对象和数组是不会被比较的。因为深比较是很昂贵的
所有对复杂类型数据结构总是 返回 false，总是不进行重新渲染
```
### 请谨记：纯组件忽略重新渲染时，不仅会影响它本身，而且会影响它的说有子元素，所以，使用PureComponent的最佳情况就是展示组件，它既没有子组件，也没有依赖应用的全局状态。

- React.PureComponent 的 shouldComponentUpdate() 只会对对象进行浅对比。如果对象包含复杂的数据结构，它可能会因深层的数据不一致而产生错误的否定判断(表现为对象深层的数据已改变视图却没有更新, 原文：false-negatives)。当你期望只拥有简单的props和state时，才去继承 PureComponent ，或者在你知道深层的数据结构已经发生改变时使用 forceUpate() 。或者，考虑使用 不可变对象 来促进嵌套数据的快速比较。

- 此外,React.PureComponent 的 shouldComponentUpate() 会忽略整个组件的子级。请确保所有的子级组件也是”Pure”的。

### React 概念
1. JSX 防止 XSS 攻击
```
JSX 防注入攻击
你可以放心地在 JSX 当中使用用户输入：

const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
React DOM 在渲染之前默认会 过滤 所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击。

```
- React 必须声明
- 由于 JSX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先声明 React 变量。

2. [属性初始化器语法](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)
```
如果使用 bind 让你很烦，这里有两种方式可以解决。如果你正在使用实验性的属性初始化器语法，
你可以使用属性初始化器来正确的绑定回调函数：

class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

```
3. 向事件处理成程序传递参数
```
箭头函数
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

bind
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

参数 e 作为 React 事件对象将会被作为第二个参数进行传递。
通过箭头函数的方式，事件对象必须显式的进行传递，
但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面
```
4. 非受控组件 input 初始值
```
在 React 的生命周期中，表单元素上的 value 属性将会覆盖 DOM 中的值。
使用非受控组件时，通常你希望 React 可以为其指定初始值，但不再控制后续更新。
要解决这个问题，你可以指定一个 defaultValue 属性而不是 value。

<input
    defaultValue="Bob"
    type="text"
    ref={(input) => this.input = input} />

同样，<input type="checkbox"> 和 <input type="radio"> 支持 defaultChecked，
<select> 和 <textarea> 支持 defaultValue.

在React中，<input type="file" /> 始终是一个不受控制的组件，因为它的值只能由用户设置，而不是以编程方式设置。
```
5. 组件的 alert 怎么写，才算优雅，，怎么写才可以函数式调用 ？？？

6. React 核心理念：单向数据流 - 反向数据流（改变顶层数据状态-回调函数，子组件-改变父组件）
    * React 的单向数据流(也叫作单向绑定)保证了一切是模块化并且是快速的

# 深入系列：

## 1. 深入 JSX
```
本质上来讲，JSX 只是为 React.createElement(component, props, ...children) 方法提供的语法糖。
比如下面的代码：

<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>

编译后：
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)

如果没有子代，你还可以使用自闭合标签，比如：
<div className="sidebar" />
React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
```
- 指定 React 元素类型 -- JSX 的标签名决定了 React 元素的类型。
- React 必须声明 -- 由于 JSX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先声明 React 变量。

- 点表示法
```
你还可以使用 JSX 中的点表示法来引用 React 组件。你可以方便地从一个模块中导出许多 React 组件。
例如，有一个名为 MyComponents.DatePicker 的组件，你可以直接在 JSX 中使用它：

import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```
- 自定义组件必须大写开头，内置组件必须小写
- 字符串常量
```
当传递一个字符串常量时，该值会被解析为HTML非转义字符串，所以下面两个 JSX 表达式是相同的：
<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
```
- 默认为 True - 如果你没有给属性传值，它默认为 true
```
<!-- 不建议这样使用 -->
因此下面两个 JSX 是等价的：
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />
```
- 扩展属性
```
如果你已经有了个 props 对象，并且想在 JSX 中传递它，你可以使用 ... 作为扩展操作符来传递整个属性对象。
下面两个组件是等效的：
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
当你构建通用容器时，扩展属性会非常有用。
然而，这样做也可能让很多不相关的属性，传递到不需要它们的组件中使代码变得混乱。
我们建议你谨慎使用此语法。

```
- 子代 -- 在包含开始和结束标签的 JSX 表达式中，标记之间的内容作为特殊的参数传递：props.children。

- 布尔值、Null 和 Undefined 被忽略 （0 可以被打印，诸如： arr.length && "显示"， 当数组长度为0时，会显示0）

## 2. 使用 PropTypes 进行类型检查
```
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为以下 JS 原生类型
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
}

Greeting.propTypes = {
  name: PropTypes.string
};

如果你在使用像 transform-class-properties 的 Babel 转换器，
你也可以在React 组件类中声明 defaultProps 作为静态属性。

和上面是等价的
class Greeting extends React.Component {
    static propTypes = {}
    static defaultProps = { }
    render() {
        return (
            <div>Hello, {this.props.name}</div>
        )
    }
}
```

## 3. 静态类型检查 Flow & TypeScript

## 4. Refs & Dom - Refs 提供了一种方式，用于访问在 render 方法中创建的 DOM 节点或 React 元素。
```
ref的值取决于节点的类型:
当 ref 属性被用于一个普通的 HTML 元素时，React.createRef() 将接收底层 DOM 元素作为它的 current 属性以创建 ref 。
当 ref 属性被用于一个自定义类组件时，ref 对象将接收该组件已挂载的实例作为它的 current 。
* 你不能在函数式组件上使用 ref 属性，因为它们没有实例
```
- 对父组件暴露 DOM 节点 (不建议)
    1. findDOMNode()
    2. 通过 props 向父组件传递子组件的 dom 节点
- 回调 Refs
```
<input ref={this.inputRef}>
如果 ref 回调以内联函数的方式定义，在更新期间它会被调用两次，第一次参数是 null ，之后参数是 DOM 元素。
这是因为在每次渲染中都会创建一个新的函数实例。因此，React 需要清理旧的 ref 并且设置新的。

<input ref={ref => this.inputRef = ref}>
通过将 ref 的回调函数定义成类的绑定函数的方式可以避免上述问题，但是大多数情况下无关紧要。
```

## 5. 性能优化
- 开发模式 - 生产模式  uglifyjs

## 6. 协调（Reconciliation）
- diff 算法
- key 万不得已，你可以传递他们在数组中的索引作为key。若元素没有重排，该方法效果不错，但重排会使得其变慢。
```
当索引用作key时，组件状态在重新排序时也会有问题。
组件实例基于key进行更新和重用。如果key是索引，则item的顺序变化会改变key值。
这将导致受控组件的状态可能会以意想不到的方式混淆和更新。
```

## 7.context

## 8.fragments - react16.3 新增的 
> React 中一个常见模式是为一个组件返回多个元素。Fragments 可以让你聚合一个子元素列表，并且不在DOM中增加额外节点。
```
Fragments 看起来像空的 JSX 标签：
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}
```
- 清晰的形式
另一种使用片段的方式是使用 React.Fragment 组件，React.Fragment 组件可以在 React 对象上使用。 
这可能是必要的，如果你的工具还不支持 JSX 片段。 注意在 React 中， <></> 是 <React.Fragment/> 的语法糖。
```
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```
- <></> 语法不能接受键值或属性。

- 如果你需要一个带 key 的片段，你可以直接使用 <React.Fragment /> 。 一个使用场景是映射一个集合为一个片段数组 
- 例如：创建一个描述列表：
```
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // 没有`key`，将会触发一个key警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```
- key 是唯一可以传递给 Fragment 的属性。在将来，我们可能增加额外的属性支持，比如事件处理。

## 8.Portals （不知道做什么用）

## 9.Error Boundaries
> 过去，组件内的 JavaScript 错误常常会破坏 React 内部状态并在下一次渲染时产生 加密的 错误信息。这些错误总会在应用代码的早期触发，但 React 并没有提供一种方式能够在组件内部优雅地来处理，也不能从错误中恢复。

```
如果一个类组件定义了一个名为 componentDidCatch(error, info): 的新方法，则其成为一个错误边界：

componentDidCatch() 方法机制类似于 JavaScript catch {}，但是针对组件。仅有类组件可以成为错误边界。
实际上，大多数时间你仅想要定义一个错误边界组件并在你的整个应用中使用。

注意错误边界仅可以捕获其子组件的错误。错误边界无法捕获其自身的错误。
如果一个错误边界无法渲染错误信息，则错误会向上冒泡至最接近的错误边界。
这也类似于 JavaScript 中 catch {} 的工作机制。
```

- componentDidCatch 参数
error 是被抛出的错误。
info 是一个含有 componentStack 属性的对象。这一属性包含了错误期间关于组件的堆栈信息。
```
//...
componentDidCatch(error, info) {
  
  /* Example stack information:
     in ComponentThatThrows (created by App)
     in ErrorBoundary (created by App)
     in div (created by App)
     in App
  */
  logComponentStackToMyService(info.componentStack);
}

//...
```

## 10. web Component

## 11. 高阶组件（HOC）
> 高阶组件（HOC）是react中对组件逻辑进行重用的高级技术。但高阶组件本身并不是React API。它只是一种模式，这种模式是由react自身的组合性质必然产生的。

#### 具体而言，高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件
- `const EnhancedComponent = higherOrderComponent(WrappedComponent);`
- 对比组件将props属性转变成UI，高阶组件则是将一个组件转换成另一个新组件。

- 高阶组件
- https://blog.rsuitejs.com/2017/08/24/react-hoc-simple-analysis/

## 11. Render Props
- 术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 在 React 组件间共享代码的简单技术。
- 带有 render prop 的组件带有一个返回一个 React 元素的函数并调用该函数而不是实现自己的渲染逻辑。
```
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```

- 记住仅仅是因为这一模式被称为 `“render props”` 而你不必为使用该模式而用一个名为 render 的 prop。实际上，组件能够知道什么需要渲染的任何函数 prop 在技术上都是 `“render prop” `。
- 尽管之前的例子使用了 render，我们也可以简单地使用 children prop！

## 12. 与第三方库协同
- 看不明白

## code Spliting
- 配合 webpack 与 React-router 

## 严格模式
```
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```
StrictMode目前有助于：
1. 识别具有不安全生命周期的组件
2. 有关旧式字符串ref用法的警告
3. 检测意外的副作用

# React API 及原理
# React.Component
- `./src/NewLife/...`

## ReactDOM
> react-dom这个软件包提供了针对DOM的方法，可以在你应用的顶级域中调用，也可以在有需要的情况下用作跳出React模型的出口。你的大部分组件都不应该需要使用这个包。

```
render() 
ReactDOM.render(
  element,
  container,
  [callback]
)
```
- 渲染一个React元素，添加到位于提供的container里的DOM元素中，并返回这个组件的一个 引用 (或者对于无状态组件返回null).
- 如果这个React元素之前已经被渲染到container里去了，这段代码就会进行一次更新，并且只会改变那些反映元素最新状态所必须的DOM元素。

> unmountComponentAtNode()
```
ReactDOM.unmountComponentAtNode(container)

从DOM元素中移除已挂载的React组件，清除它的事件处理器和state。
如果容器内没有挂载任何组件，这个函数什么都不会干。 有组件被卸载的时候返回true，没有组件可供卸载时返回 false。
```

> findDOMNode()
```
ReactDOM.findDOMNode(component)


如果这个组件已经被挂载到DOM中，函数会返回对应的浏览器中生成的DOM元素 。 
当你需要从DOM中读取值时，比如表单的值，或者计算DOM元素的尺寸，这个函数会非常有用。 
大多数情况下，你可以添加一个指向DOM节点的引用，从而完全避免使用findDOMNode 这个函数. 
当 render 返回 null 或者 false 时, findDOMNode 也返回 null.

备用方案不建议使用
```

## ReactDOMServer  
> 服务端渲染使用 - renderToString() - renderToStaticMarkup()

## DOM元素 
- React和HTML DOM属性的区别
```
checked 属性
input 标签 type 属性值为 checkbox或radio时，支持checked属性。
与之相对 defaultChecked 这是非受控组件组件的属性，用来设定对应组件首次加载时是否选中状态

类名属性
className

danagerouslySetInnerHTML函数
danagerouslySetInnerHTML 是React提供的替换浏览器DOM中的 innerHTML 接口的一个函数


htmlFor

onChange函数
onChange事件处理函数的表现正如你所期望的：无论form表单何时发生变化，这个事件都会被触发。

selected
<select>
<option>组件支持 selected 属性。

style 属性
style属性接受一个键为小驼峰命名法命名的 JavaScript 对象作为值，而不像css字符串。
这和DOM中 style 属性接收 JavaScript对象key的命名方式保持一致性，更高效而且能够防止跨站脚本（XSS）的安全漏洞
样式 key 使用小驼峰命名法是为了和js访问DOM特性对对象的处理保持一致性（例如：node.style.backgroundImage）

value 属性
input 和 textarea 组件都支持 value属性 - 受控组件
defaultValue 非受控组件
```


## 合成事件
- 剪切板事件、选中事件、图片、媒体对象加载事件、动画事件、缓动事件
```
Clipboard Events
Composition Events
Keyboard Events
Focus Events
Form Events
Mouse Events
Selection Events
Touch Events
UI Events
Wheel Events
Media Events
Image Events
Animation Events
Transition Events
Other Events
```

## 浅层组件
- 用来写测试用例

## ajax 及 api
- 在 `componentDidMount` 里发送ajax 
- 在 `componentWillUnmount` 里 `abort` ajax

## 在组件中中使用事件处理函数
1. bind
2. 箭头函数
- 在render方法中使用Function.prototype.bind会在每次组件渲染时创建一个新的函数，可能会影响性能
- 在render方法中使用箭头函数也会在每次组件渲染时创建一个新的函数，可能会影响性能

> 可以在 render 方法中使用箭头函数吗
- 一般来说是可以的，并且直接箭头函数是向回调函数传递参数的最简单的办法。但是如果遇到了性能问题，一定要进行优化！

> 怎样为事件处理程序或回调函数传递参数？
```

// bind 和箭头函数在 rerender 时都会创建新的函数，这可能会影响性能，如果要传值建议用 data- 属性 


bind:
<button onClick={this.handleClick.bind(this, id)} />


箭头函数传递参数
<li key={letter} onClick={() => this.handleClick(letter)}>
  {letter}
</li>


通过data-属性传递参数

同样的，也可以使用DOM API来存储事件处理程序需要的数据。
如果需要优化大量元素或使用依赖于React.PureComponent相等性检查的渲染树，请考虑使用此方法。

handleClick(e) {
  this.setState({
    justClicked: e.target.dataset.letter
  });
}


<ul>
  {this.state.letters.map(letter =>
    <li key={letter} data-letter={letter} onClick={this.handleClick}>
      {letter}
    </li>
  )}
</ul>

```

#### 怎样避免函数被调用太快或者太多次？
- throttle debounce frameAnimation

## 样式
- 如何在 react 做动画？
- React 可以被用来增强动画。例如：查看 `React Transition Group` 和 `React Motion`。

## vitural DOM
- 虚拟DOM（VDOM）是一种编程概念，是指虚拟的视图被保存在内存中，并通过诸如ReactDOM这样的库与“真实”的DOM保持同步。这个过程被称为和解。
- 影子DOM(shadow DOM) 虚拟DOM（ vitural DOM）
- React  fiber   React16中的和解引擎

