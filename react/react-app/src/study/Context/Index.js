import React,{Component} from 'react';
import PropTypes from 'prop-types';

class Index extends Component {
    //验证 context，必写的
    static childContextTypes = {
        themeColor:PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            themeColor:'red'
        }
    }
    //以下是设置context的方法，return的结果就是 context 的内容，所有的子组件都可以访问到这个对象
    getChildContext() {
        return { themeColor:this.state.themeColor }
    }
    render() {
        return (
            <div>
                <Header/>
                <Main/>
            </div>
        )
    }
}

class Header extends Component {
    render() {
        return (
            <div>
                <h2>this is title</h2>
                <Title/>
            </div>
        )
    }
}

class Main extends Component {
    render() {
        return (
            <div>
                <h2>this is main</h2>
                <Content/>
            </div>
        )
    }
}

class Title extends Component {
    //子组件要获取 context 里面的内容，验证是必须要写的，想获取的结果是 字符串
    static contextTypes = {
        themeColor:PropTypes.string
    }
    render() {
        return (
            <div>
                <h1 style={{ color:this.context.themeColor }}>react.js 小书 标题</h1>
            </div>
        )
    }
}

class Content extends Component {
    render() {
        return (
            <div>
                <h2>react.js 小书，内容</h2>
            </div>
        )
    }
}

export default Index;