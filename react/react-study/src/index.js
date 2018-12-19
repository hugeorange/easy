import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import logo from './logo.svg';
import registerServiceWorker from './registerServiceWorker';
// import ContextApp from './context/ContextApp';
// import ContextApp2 from './context/Context-2';

// import Head from './Hoc/Head';
// import MouseTracker from './RenderProps/RenderProps';

import NewLifeCycle from './NewLife/NewLifeCycle';

class App extends Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <div>
              {/* <ContextApp/>
              <br/>
              <ContextApp2/>
              <br/>
              <Head/>
              <br/>
              <MouseTracker/>
              <br/> */}
              <NewLifeCycle/>
          </div>
        </div>
      );
    }
}
    
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
