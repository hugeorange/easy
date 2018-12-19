import React, { Component } from 'react';

// 测试 ref的作用
class ConfirmPass extends Component {
    constructor() {
        super();
        this.state = {
            msg: '测试 ref的使用============'
        }
    }
    changeMsg() {
        this.setState({
            msg: 'ooooooooooooooo'
        })
    }
    render() {
        return (
            <div>{this.state.msg}</div>
        )
    }
}

/**
 * ref简介
 * React提供的这个ref属性，表示为对组件真正实例的引用，其实就是 React.render() 返回的组件实例；
 * 需要区分一下，ReactDOM.render() 渲染组件时返回的是组件实例；而渲染dom元素时，返回具体的dom节点
 * ref属性可以设置为一个回调函数，这也是官方强烈推荐的用法；这个函数的执行时机为：
 * - 组件被挂载后，回调函数被立即执行，回调函数的参数为该组件的具体事例（可以调用该组件的内部方法）
 * - 组件被卸载或者原有的ref属性本身发生变化时，回调函数也会被立即执行，此时回调函数参数为 null，以确保内存泄漏
 * 当回调函数执行时，必定能拿到 ref 的DOM元素
 */


class RefComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        }
    }
    changeVisible() {
        this.setState({visible: !this.state.visible});    
    }
    refCb(instance){
        console.log(instance);
        // if(instance && instance.changeMsg) {
        //     console.log('子组件已挂载...');
        //     instance.changeMsg();        
        // } else {
        //     console.log('子组件已卸载...');
        // }
    }
    render(){
        return(
            <div>
                <button type="button" onClick={this.changeVisible.bind(this)}>{ this.state.visible ? '卸载' : '挂载' } >ConfirmPass</button>
                {/* {this.state.visible ? <ConfirmPass ref={this.refCb}/> : null } */}

                {this.state.visible ? <div ref={this.refCb}> DOM元素ref测试 </div> : null }
            </div>
        )
    }
}

export { RefComponent } 