import React from 'react';

export default class TestNewLife extends React.Component {
    constructor() {
        super();
        this.state = {
            numflag: 1
        }
    }
    // 无法获取上一次的 props，如果要对比两次props是否相同，可以将上一次的 props 存到 state
    /** 
     * 注意，如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用。如果你只想处理变化，你可能想去比较新旧值。
       调用this.setState() 通常不会触发 getDerivedStateFromProps()。
    */
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("getDerivedStateFromProps", nextProps, prevState);
        // 返回一个对象（设置state） 或者 返回 null 不设置 state
        return {
            numflag: 2
        };
    }
    /**
     * 为什么我们不给一个prevProps参数呢，官方解释是，
     * 一来prevProps第一次被调用的时候是null，每次更新都要判断耗性能，
     * 二来如果大家都习惯了，以后react不记录prevProps的话（啥），可以省下不少内存
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate", nextProps, nextState);
        if (nextProps.number === 3) return false;
        else return true;
    }


    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("getSnapshotBeforeUpdate", prevProps, prevState);
        return "AAA";
    }
    /**
     *
        getSnapshotBeforeUpdate()在最新的渲染输出提交给DOM前将会立即调用。
        它让你的组件能在当前的值可能要改变前获得它们。
        这一生命周期返回的任何值将会 作为参数被传递给componentDidUpdate()。

        根据不同的条件返回一些值，供 componentDidUpdate 钩子使用，比如：改变dom位置
     */

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate", prevProps, prevState, snapshot);
    }
    /**
     * componentDidUpdate()会在更新发生后立即被调用。该方法并不会在初始化渲染时调用。
     * componentWillUpdate, componentWillReceiveProps 在一次更新中可能会被触发多次，
     * 因此这种只希望触发一次的副作用应该放在保证只触发一次的componentDidUpdate中。
     * 
     * 当组件被更新时，使用该方法是操作DOM的一次机会。这也是一个适合发送请求的地方，
     * 要是你对比了当前属性和之前属性（例如，如果属性没有改变那么请求也就没必要了）。
     */

    componentWillUnmount() {
        /**
         * componentWillUnmount()在组件被卸载和销毁之前立刻调用。
         * 可以在该方法里处理任何必要的清理工作，
         * 例如解绑定时器，取消网络请求，清理任何在componentDidMount环节创建的DOM元素。
         */
    }

    componentDidCatch(err, info) {
        console.log(err, info); // 不懂，怎么用
    }
    render() {
        const { number } = this.props;
        console.log("我变化了", number, this.state);
        return (
            <div>
                测试新的生命周期 --- {number}
            </div>
        )
    }
}


/**
 * 
 * props更新时重新请求 — Fetching external data when props change
   传入新的props时重新异步取数据，getDerivedStateFromProps+ componentDidUpdate 替代 componentWillReceiveProps

// old - 仅会在父组件 rerender 时才会调用，this.setState 不会调用
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
    	this.setState({externalData: null});
        this._loadAsyncData(nextProps.id);
    }
  }


// new
  static getDerivedStateFromProps(nextProps, prevState) {
    // Store prevId in state so we can compare when props change.
    if (nextProps.id !== prevState.prevId) {
      return {
        externalData: null,
        prevId: nextProps.id,
      };
    }
    // No state update necessary
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.externalData === null) {
        this._loadAsyncData(this.props.id);
    }
  }

 */

 /**
  * React API
  * 
  * 1. setState
  *    后一个状态依赖前一个状态 - 推荐使用updater函数形式
  *    之后的调用在同一周期中将会重写之前调用的值，因此数量仅会被加一。
  *    若之后的状态依赖于之前的状态，我们推荐使用updater函数形式：
  *    this.setState((prevState) => {
         return {counter: prevState.quantity + 1};
       });
       而不是
       this.setState({
           counter: this.state.counter
       }, () => {

       })


    2. component.forceUpdate(cb)
        默认情况，当你的组件或状态发生改变，你的组件将会重渲。
        若你的render()方法依赖其他数据，你可以通过调用forceUpdate()来告诉React组件需要重渲。
        调用forceUpdate()将会导致组件的 render()方法被调用，并忽略shouldComponentUpdate()。
        这将会触发每一个子组件的生命周期方法，涵盖，每个子组件的shouldComponentUpdate() 方法

        通常你应该尝试避免所有forceUpdate() 的用法并仅在render()函数里从this.props和this.state读取数据。

    3. 类属性 - defaultProps
       defaultProps可以被定义为组件类的一个属性，用以为类设置默认的属性。
       这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用

    4. displayName 
       displayName被用在调试信息中。JSX 会自动设置该值
    
    5. 实例属性 state、props ， this.props.children 的特别之处 

  */