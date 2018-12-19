import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * connect 接受一个参数 mapStateToProps
 * 返回一个函数，这个函数是 高阶组件
 * 高阶组件接受一个组件作为参数
 * 然后用 Connect 把组件包装以后再返回
 */

export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
      static contextTypes = {
        store: PropTypes.object
      }

      constructor() {
          super()
          this.state = {
              allProps: {}
          }
      }
      componentWillMount() {
          const { store } = this.context;
          this._updateProps();
          store.subscribe(() => {
              this._updateProps();
          })
      }

      _updateProps() {
          const {store} = this.context;
        //   防止 mapStateToProps 没有传入
          let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {};
        //   防止 mapDispatchToProps 没有传入
          let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.store) : {};
          this.setState({
              allProps: {
                  ...stateProps,
                  ...dispatchProps,
                  ...this.props
              }
          })
      }

      _updateProps000() {
          const { store } = this.context;
          /**
           * mapStateToProps 可以接受两个参数了
           * 把传给 connect 组件的 props 参数也传给他
           * 根据 store 里面的state和外界传入的 props 生成被包装组件的参数
           */
          // 额外传入 props，让获取数据更加灵活方便, 返回 mapStateToProp 需要返回的对象
          let stateProps = mapStateToProps(store.getState(), this.props); 

          // 将 mapStateToProps 返回的对象，与父组件传递来的props 统一传入目标函数          
          this.setState({
              allProps: { // 整合普通的 props和从state生成的props
                  ...stateProps,
                  ...this.props
              }
          })
      }
    
      render() {
        return <WrappedComponent {...this.state.allProps}/>
      }
    }
    return Connect;
  }


  
  // connect 的用法
  /**
  const mapStateToProps = (state) => {
    return {
      themeColor: state.themeColor
    }
  }
  
  Header = connect(mapStateToProps)(Header)
  
   */


//    provider 容器组件，会把嵌套的内容原封不动作为子组件渲染出来，还会把外界传给他的 `props.store` 放到 context，这样子组件 connect 的时候都可以获取到

export class Provider extends Component {
    static PropTypes = {
        store: PropTypes.object,
        children: PropTypes.any
    }
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext() {
        return {
            store: this.props.store
        }
    }
    render() {
        return <div>{this.props.children}</div>
    }
}