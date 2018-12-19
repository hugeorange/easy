import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import "@/css/index";
import ExampleRouter from "@/view/index";
import png2 from "@/img/2.png";
import png1 from "@/img/1.png";


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			elements: "",
		}
		this.elements = "";
  	}
  	componentDidMount() {
		this.div1C();
		console.log(_);
  	}


  	div1C = () => {
		async function a() {
			console.log('begin');
			await new Promise((resolve) => {
				setTimeout(() => {
					console.log("await");
					resolve();
				}, 1000);
			})
			console.log('done');
		}
		a();
	}

  render() {
    return (
      	<div>
			<div className="div1" onClick={this.div1C}>1</div>
			<div className="div1">2</div>
			<div className="div1">3</div>
			<div className="div1">4</div>
			<div className="div1">5</div>
			<div className="img-png">
				<img src={png2} alt=""/>
				<img src={png1} alt=""/>
			</div>

			{ this.elements }

			<ExampleRouter/>
		</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  	module.hot.accept();
}