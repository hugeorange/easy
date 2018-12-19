### 问题
- [] `redux-devtools-extension` 生产环境隐藏调试工具，`redux-logger`

# 动手实现 Redux
### 抽离store 和监听函数
1. appState，dispatch

2. appState, dispatch ==> store (createStore)

```
function createStore(state, stateChanger) {
    const getState = () => state;
    const dispatch = (action) => stateChanger(state, action);
    return { getState, dispatch }
}
```
3. 监控数据变化--观察者模式
```
function createStore(state, stateChanger) {
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        stateChanger(state, action)
        listeners.forEach((listener) => listener())
    }
    return { getState, dispatch, subscribe }
}
```
- 可以通过 `stroe.subscribe(listener)` 的方式给 `subscribe  `传入一个监听函数，这个函数会被 `push`到数组中
- 现在我们有了一个比较通用的 `createStore` ,他可以生产一种我们新定义的数据类型 `store`，通过 `store.getState` 我们获取共享状态，而且我们约定只能通过 `store.dispatch` 修改共享状态。`store` 也允许我们通过 `store.subscribe` 监听数据状态被修改了，并且进行后续的例如重新渲染页面的操作

### 纯函数（Pure Function）
> 一个函数的返回结果只依赖与它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数
1. 函数的返回结果只依赖与他的参数
2. 函数执行过程里面没有副作用

### 共享结构的对象提高性能
```
let appState = {
    title: ...,
    content: ...
}

let newAppState = { // 新建一个 newAppState
  ...appState, // 复制 appState 里面的内容
  title: { // 用一个新的对象覆盖原来的 title 属性
    ...appState.title, // 复制原来 title 对象里面的内容
    text: '《React.js 小书》' // 覆盖 text 属性
  }
}

appState 和 newAppState 其实是两个不同的对象，
因为对象浅复制的缘故，其实它们里面的属性 content 指向的是同一个对象；
但是因为 title 被一个新的对象覆盖了，所以它们的 title 属性指向的对象是不同的。
同样地，修改 appState.title.color：

```
> 我们每次修改某些数据的时候，都不会碰原来的数据，而是把需要修改数据路径上的对象都 copy 一个出来。这样有什么好处？看看我们的目的达到了：
```
修改数据的时候就把修改路径都复制一遍，但是保持其他内容不变，
最后的所有对象具有某些不变共享的结构（例如上面三个对象都共享 content 对象）。
大多数情况下我们可以保持 50% 以上的内容具有共享结构，这种操作具有非常优良的特性，我们可以用它来优化上面的渲染性能。
```
```
function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = stateChanger(state, action) // 覆盖原对象
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}

function renderApp (newAppState, oldAppState = {}) { // 防止 oldAppState 没有传入，所以加了默认参数 oldAppState = {}
  if (newAppState === oldAppState) return // 数据没有变化就不渲染了
  console.log('render app...')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle (newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return // 数据没有变化就不渲染了
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent = {}) {
  if (newContent === oldContent) return // 数据没有变化就不渲染了
  console.log('render content...')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

let appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

function stateChanger (state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state // 没有修改，返回原来的对象
  }
}

const store = createStore(appState, stateChanger)
let oldState = store.getState() // 缓存旧的 state
store.subscribe(() => {
  const newState = store.getState() // 数据可能变化，获取新的 state
  renderApp(newState, oldState) // 把新旧的 state 传进去渲染
  oldState = newState // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
})

renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
```

- `stateChanger === reducer 是不允许有副作用的`。你不能在里面操作 `DOM`，也不能发 `Ajax` 请求，更不能直接修改 `state`，它要做的仅仅是 —— 初始化和计算新的 state。

### redux 总结
```
// 定一个 reducer
function reducer (state, action) {
  /* 初始化 state 和 switch case */
}

// 生成 store
const store = createStore(reducer)

// 监听数据变化重新渲染页面
store.subscribe(() => renderApp(store.getState()))

// 首次渲染页面
renderApp(store.getState()) 

// 后面可以随意 dispatch 了，页面自动更新
store.dispatch(...)
```


