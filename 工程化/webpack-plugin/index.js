import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    render() {
        return (
            <div className="App">
                我是一个react应用
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
