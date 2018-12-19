import React,{Component} from 'react';

export default (WrappedComponent, name) => {
    class LocalStorageActions extends Component {
      constructor () {
        super()
        this.state = { data: null }
      }
  
      componentWillMount () {
        let data = localStorage.getItem(name)
        try {
          // 尝试把它解析成 JSON 对象
          this.setState({ data: JSON.parse(data) })
        } catch (e) {
          // 如果出错了就当普通字符串读取
          this.setState({ data })
        }
      }
  
      saveData (data) {
        try {
          // 尝试把它解析成 JSON 字符串
          localStorage.setItem(name, JSON.stringify(data))
        } catch (e) {
          // 如果出错了就当普通字符串保存
          localStorage.setItem(name, `${data}`)
        }
      }
  
      render () {
        return (
          <WrappedComponent
            data={this.state.data}
            saveData={this.saveData.bind(this)}
            // 这里的意思是把其他的参数原封不动地传递给被包装的组件
            {...this.props} />
        )
      }
    }
    return LocalStorageActions
  }



// getData(url) 已经可以直接使用
// 本站的环境都可以使用 async/await

/**
 * 高阶组件就是一个函数，传给它一个组件，它返回一个新的组件。
 * 高阶组件是一个函数（而不是组件），它接受一个组件作为参数，返回一个新的组件
 * 
 * 注意最后一行代码：Post = loadAndRefresh('/post')(Post)。
   这种方式其实是 React 里面高阶组件常用的套路，在 React-redux 里面就用到。
   loadAndRefresh 是一个函数，这个函数接受一个参数，然后返回一个函数，这个函数接受组件作为参数，然后再返回一个组件。
 */

function getData() {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve('恭喜您加载成功');
    } else {
      reject('很遗憾加载失败');
    }
  })
}

const loadAndRefresh = (url) => (WrappedComponent) => {
    return class extends React.Component {
      componentWillMount() {
        this._loadText()
      }
      async refresh() {
        this.setState({content: '数据加载中...'});
        const content = await getData(url);
        this.setState({content});
      }
      render() {
        return <WrappedComponent {...this.props} content={this.state.content} refresh={this._loadText.bind(this)}/>
      }
    }
}
  

// 使用上面定义的高阶组件 ,使用方法
class Post extends Component {
  render () {
    return (
      <div>
        <p>{this.props.content}</p>
        <button onClick={() => this.props.refresh()}>刷新</button>
      </div>
    )
  }
}

Post = loadAndRefresh('/post')(Post)


/**
 * context 特性使用
 * 父组件
 */

/** 
class ... {
  static childContextTypes = {
    themeColor: PropTypes.string
  }

  // 父组件设置 context
  getChildContext() {
    return {themeColor: this.state.themeColor}
  }
}
*/

/**
 * 子组件使用父组件设置的 context
 */

 /**
 class ... {
   static contextTypes = {
    themeColor: PropTypes.string
   }
   ... 然后在使用的地方 this.context.themeColor
 }
  */