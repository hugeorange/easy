import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ContextApp extends Component {
    render() {
        return (
            <div>
                测试Context API 组件--
                <ChildComponent/>
            </div>
        )
    }

    // 返回Context对象，方法名是约定好的  context 生产者
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
}

export default ContextApp;


// context 消费者
class ChildComponent extends Component {
    // constructor(props) {
        // super(props);
        // 此处获得不了context值
        // console.log(this.context);
    // }
    render() {
        // console.log(this.context);
        return (
            <div>
                使用 context 的子组件
                <br/>
                {`context.propA = ${this.context.propA}`}
                <br/>
                {`context.methodA = ${this.context.methodA()}`}
                <StatelessComponent aaa="hello world"/>
            </div>
        )
    }

    // 声明需要使用的Context属性
    static contextTypes = {
        propA: PropTypes.string,
        methodA: PropTypes.func
    }
}

const StatelessComponent = (props, context) => {
    // console.log("props", props, "context", context);
    return (
        <div>老版本ContextAPI我是无状态组件</div>
    )
}
StatelessComponent.contextTypes = {
    propA: PropTypes.string    
}