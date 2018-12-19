import React from 'react';
import TestNewLife from './TestNewLife'

export default class NewLifeCycle extends React.Component {
    constructor() {
        super();
        this.state = {
            number: 0,
            number2: 2, 
        }
    }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log("getDerivedStateFromProps", nextProps, prevState)
    //     return null;
    // }
    // componentWillMount() {
    //     console.log("componentWillMount");
    // }
    updateProps = () => {
        let number = this.state.number;
        let number2 = this.state.number;
        
        this.setState({
            number: ++number,
            number2: ++number2,
        })
    }
    render() {
        console.log(this.state.number);
        return (
            <div>
                <button onClick={this.updateProps}>新的生命周期钩子 - {this.state.number2}</button>
                <TestNewLife number={this.state.number}/>
            </div>
        )
    }
}
