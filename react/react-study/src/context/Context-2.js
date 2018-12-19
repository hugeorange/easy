import React from 'react';
import PropTypes from 'prop-types'

const ThemeContext = React.createContext();


// 生产者
class ContextApp2 extends React.Component {
    render () {
      return (
        <ThemeContext.Provider value={{background: 'green', color: 'white'}}>
          <Header />
        </ThemeContext.Provider>
      );
    }
}

export default ContextApp2;

  
// 消费者
class Header extends React.Component {
    render () {
      return (
        <Title>Hello React Context API</Title>
      );
    }
  }


// 消费者
class Title extends React.Component {
    constructor(props, context) {
        super(props);
        // console.log(context); // 此处获得不了context值
    }
    componentDidMount() {
        // console.log("Didmount", this.context);
    }
    btnClick = (context) => {
        // console.log(context);
    }
    render () {
      return (
        <ThemeContext.Consumer>
          {context => {
              return (
                    <h1 style={{background: context.background, color: context.color}}>
                        {this.props.children}
                        <button onClick={() => {this.btnClick(context)}}>点击获取context</button>
                        <StatelessComponent/>
                    </h1>
                )
          }}
        </ThemeContext.Consumer>
      );
    }
}

const StatelessComponent = (props, context) => {
    // console.log("新版本contextAPI", "props", props, "context", context);
    return (
        <div>我是无状态组件</div>
    )
}

StatelessComponent.contextTypes = {
    background: PropTypes.string,    
    color: PropTypes.string    
}