import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const babylon = require('babylon');

const code = `
function plus(a, b) {
  return a + b;
}
`;
const ast = babylon.parse(code);
console.log('ast-->', ast)

class App extends Component {

    componentDidMount() {

    }
    render() {
        return (
            <div className="App">
                我是一个react应用
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
