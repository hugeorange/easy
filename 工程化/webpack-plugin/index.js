// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';


// const babylon = require('babylon');

// const code = `
// function plus(a, b) {
//   return a + b;
// }
// `;
// const ast = babylon.parse(code);
// console.log('ast-->', ast)

// class App extends Component {

//     componentDidMount() {

//     }
//     render() {
//         return (
//             <div className="App">
//                 我是一个react应用
//             </div>
//         );
//     }
// }

// ReactDOM.render(<App />, document.getElementById('root'));



require("@babel/polyfill")
console.log([1,2,3,4,5].includes(5))
console.log(new Map({}))
