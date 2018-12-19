import React, { Component } from 'react';

class LinkButton extends Component{
    //设置 默认 props 属性
    static defaultProps = {
        styleProps :   { 
            bgColor:　'green',
            color:'#fff' 
        }
    }
    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            buttonStatus:false,
            buttonText:'点赞'
        }
    }

    changeLikeText(){
        console.log(this.props);
        this.setState({
            buttonStatus:!this.state.buttonStatus
        })
        let text = this.state.buttonStatus ? '取消赞' : '点赞';
        this.setState({
            buttonText:text,
        })
    }

    render(){
        //ES6 组件绑定事件时，必须要在事件绑定时加上 bind(this),否则 this 指向会指向null
        return (
            <div>
                <button onClick={this.changeLikeText.bind(this)} style={{backgroundColor:this.props.styleProps.bgColor,color:this.props.styleProps.color}}>{this.state.buttonText}</button>
            </div>
        )
    }
}


class Testbutton extends Component {
    constructor(props){
        super(props);
        this.state = {};        
    }
    handlerClick(word,e){
        // 直接传递对象，达不到想要的结果
        /*
        this.setState({count:0});
        this.setState({count:this.state.count + 1});
        this.setState({count:this.state.count + 2});
        */

        // 可以将上一个 setState 的结果，作为参数传入该函数，这样就可以在上次操作完 setState 之后继续操作了
        this.setState((prevState) => {
            console.log(prevState);
            return {count:0}
        });

        this.setState((prevState) => {
            return {count:prevState.count + 1}
        });
        
    }
    componentDidUpdate(){
        /**
         * 虽然 handlerClick 执行了三次 两次 setState 方法，但 render 方法只会执行一次
         * 这是因为react.js 内部会把 JavaScript事件循环中的消息放在消息队列的同一个消息中心 setState，都进行合并以后，然后再重新渲染组件
         */
        
        
        console.log(this.state.count);
    }
    render() {
        return (
            <div>
                <div className="test-btn" onClick={this.handlerClick.bind(this, 'hello world')}>点击我，查看当前 this</div>
                <button>{this.state.count} --- jjj</button>
            </div>
        )
    }
}

//props 试水，练习
class Computer extends Component {
    constructor() {
      super();
      this.state = {
        status:'off'
      }
    }
    toggle(){
      if(this.state.status === 'off'){
        this.setState({status:'on'});
      }else{
        this.setState({status:'off'});
      }
      
    }
    render () {
      return (
        <div>
          <button onClick={this.toggle.bind(this)}>{this.state.status === 'off' ? '关' : '开'}</button>
          <Screen showContent={this.state.status}/>
        </div>
      )
    }
  }
  
  class Screen extends Component {
    static defaultProps = {
      showContent:'无内容'
    }

    render () {
      let showContent;
      if(this.props.showContent === 'on'){
        showContent = "显示器亮了";
      }else if(this.props.showContent === 'off'){
        showContent = "显示器关了";
      }else{
        showContent = this.props.showContent;
      }

      return (
        <div className='screen'>{showContent}</div>
      )
    }
  }


//   无状态组件
const HelloWorld = (props) => {
    
    let text = props.text || 'hello world';
    const sayHi = (event) => { alert(text) };
    return (
        // 直接绑定方法
        <div onClick={sayHi}>点击我</div>
    )
}


// 用户列表渲染
const users = [
    { username: 'Jerry', age: 21, gender: 'male' },
    { username: 'Tomy', age: 22, gender: 'male' },
    { username: 'Lily', age: 19, gender: 'female' },
    { username: 'Lucy', age: 20, gender: 'female' }
]

class UserList extends Component {
    render() {
        return (
            <div> 
                {users.map((user,index) => {
                    return (
                        <ul key={index}>
                            <li>姓名：{user.username}</li>
                            <li>年龄：{user.age}</li>
                            <li>性别：{user.gender}</li>
                            <hr/>
                        </ul>
                    )
                })} 
            </div>
        )
    } 
}



// 章节列表
const lessons = [
    { title: 'Lesson 1: title', description: 'Lesson 1: description' },
    { title: 'Lesson 2: title', description: 'Lesson 2: description' },
    { title: 'Lesson 3: title', description: 'Lesson 3: description' },
    { title: 'Lesson 4: title', description: 'Lesson 4: description' }
]
  
class Lesson extends Component {
    render() {
      let {lesson} = this.props;
      return (
        <div>
          <h1 onClick={()=> { console.log(this.props.index + '---' + lesson.title) }}>{lesson.title}</h1>
          <p>{lesson.description + '---' + this.props.index}</p>

        </div>  
      )
    }
}
  
class LessonsList extends Component {
    render() {
      return (
        <div>
          {lessons.map((lesson,index) => {
            return (
              <Lesson key={index} index={index} lesson={lesson}/>
            )
          })}
        </div>
      )
    }
}
  
  
  
export {LinkButton,Testbutton,Computer,Screen,HelloWorld,UserList,LessonsList} ;