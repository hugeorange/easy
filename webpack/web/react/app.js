import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import "@/css/index";
import { BrowserRouter } from 'react-router-dom';
import Page from "@/view/route/route";

console.log("=============");
class App extends React.Component {
  render() {
    return (
		  <BrowserRouter>
			  <Page/>
	  	</BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  	module.hot.accept();
}
