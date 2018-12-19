import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router ,BrowserRouter } from 'react-router-dom';
import BrowserHistory from '@/util/history';
import Page from "@/view/route/route";

class App extends React.Component {
  render() {
    return (
      <Router history={BrowserHistory}>
			  <Page/>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  	module.hot.accept();
}



