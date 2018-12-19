### MultiSelect 组件
- 数量不定的两个级联的 select ，可以点击添加按钮动态添加 行数量，一个保存按钮，点击可以获取select的选中的数据，组成一个数组
```
使用方法
<MultiSelect
    firstSelect={quantype}              // 第一个select的列表项
    secondSelect={quanLevel}            // 第二个select的列表项，一般由第一个列表项选中之后，ajax请求得到
    fetchData={this.fetchData}          // 当 secondFetch 为false时必填，表示第二个select的列表，由ajax请求获得
    secondFetch={true}                  // 默认值为true，当第二个select不需要ajax，传false
    firstDefaultText={'请选择优惠券'}     // 第一个初始select的提示语
    secondDefaultText={'请选择优惠券等级'} // 第二个初始select的提示语
    submitData={this.savaData}          // 点击保存按钮，所有select选中的数据
    firstValue='k'                      // 保存数据的 key 值
    secondValue='v'                     // 保存数据的 value 值
    ref="multiSelect"                   // 获取子组件实例，方便使用 添加、保存方法
    labelText='请选择您需要的优惠券'       // select 钱的 label 提示文案  
/>
```


> 遇到的困难
- 对 react 的 key 概念的理解的不到位，不要使用索引作为 key值，使用一个全局递增的变量的作为key值
- react 获取 select 选中的值 `e.target.value` 
- 原生获取 select 选中的 `var sIndex = dom.options.selectIndex`, 获得选中的 options 索引,` dom.options[sIndex]`

- React 表单的受控组件
```
input textarea select 

value={this.state.xxx}
onChange={this.handleXXX}
```

- 组件 `ref属性` 获取 子组件的实例，从而方便在某些特定的情况，在父组件想调用子组件的方法, `this.refs.xxx.childFunc`
- JSX元素的 `ref属性` 是获取当前元素的 DOM节点

- React 生命周期的理解 [生命周期](http://react-china.org/t/react/1740)
- 对 `componentWillReciveProps(nextProps) 的利用`
- 

React 生命周期
```
第一次组件渲染时

constructor 
componentWillMount
render
componentDidMount
```

```
当组件state发生改变时 (调用 this.setState)

"shouldComponentUpdate"
"componentWillUpdate"
"render"
"componentDidUpdate"
```

```
当组件props发生改变时

"componentWillReceiveProps"
"shouldComponentUpdate"
"componentWillUpdate"
"render"
"componentDidUpdate"
```

```
组件被卸载时

"componentWillUnmount"
```

> 以上可以调用 setState 的时机 只有 `componentDidUpdate`, `componentWillReceiveProps`

- componentWillReceiveProps
```
  一个已经mounted的组件接收一个新的props之前componentWillReceiveProps()被调用，
  如果我们需要更新state来响应prop的更改，我们可以在此方法中比较this.props和nextProps并使用this.setState来更改state。
  注意，即使props没有改变，React也可以调用这个方法，因此如果你只想处理改变，请确保比较当前值和下一个值。
  当父组件导致你的组件重新渲染时，可能会发生这种情况。
  React在组件mounting期间不会调用此方法，只有在一些组件的props可能被更新的时候才会调用。
  调用this.setState通常不会触发componentWillReceiveProps。

```

- shouldComponentUpdate
```
shouldComponentUpdate()
  使用此方法让React知道组件的输出是否不受当前state或props更改的影响。
  默认行为是在每次state更改时重新渲染组件，在大多数情况下，我们应该默认改行为。
  当接收到新的props或state时，shouldComponentUpdate()在渲染之前被调用。
  默认返回true，对于初始渲染或使用forceUpdate()时，不调用此方法。
  返回false不会阻止子组件的state更改时，该子组件重新渲染。
  如果shouldComponentUpdate()返回false，
  那么componentWillUpdate()，render()和componentDidUpdate()将不会被调用。
  在将来，React可能将shouldComponentUpdate()作为提示而不是strict指令，返回仍然可能导致组件重新渲染。
```
- render
```
  render()方法是react组件必须的，它检查this.props和this.state并且返回一个React元素，
  我们也可以返回null或false，代表我们不想有任何的渲染。
  render()方法应该是一个纯方法，即它不会修改组件的state，在每一次调用时返回同样的结果。
  它不直接和浏览器交互，如果我们想要交互，应该在componentDidMount()或者其他的生命周期函数里面。
```