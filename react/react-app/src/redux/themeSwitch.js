import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { connect } from './react-redux';
import { connect } from 'react-redux'

class ThemeSwitch extends Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor() {
    super();
    this.state = {
      themeColor: ''
    }
  }
  componentWillMount() {
    const { store } = this.context;
    this._updateThemeColor();
    store.subscribe(() => this._updateThemeColor());
  }
  _updateThemeColor() {
    const { store } = this.context;
    const state = store.getState();
    this.setState({
      themeColor: state.themeColor
    })
  }
  handleSwitchColor(color) {
    const { store } = this.context;
    store.dispatch({
      type: "CHANGE_COLOR",
      themeColor: color
    })
  }

  render() {
    return (
      <div>
        <button
          style={{ color: this.state.themeColor }}
          onClick={this.handleSwitchColor.bind(this, 'red')}>Red</button>
        <button
          style={{ color: this.props.themeColor }}
          onClick={this.props.onSwitchColor.bind(this, 'blue')}>props里面获取的颜色,dispatch改变颜色</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    themeColor: state.themeColor
  }
}

const maoDispatchToProps = dispatch => {
  return {
    onSwitchColor: (color) => {
      dispatch({type: 'CHANGE_COLOR', themeColor: color})
    }
  }
}

export default connect(mapStateToProps, maoDispatchToProps)(ThemeSwitch)