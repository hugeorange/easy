import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import { connect } from './react-redux'
import { connect } from 'react-redux'

class Header extends Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      themeColor: ''
    }
    console.log('headerProps' , props);
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
  render() {
    return (
      <div>
        <h1 style={{ color: this.state.themeColor }}> context 取出来的 数据 React.js 小书</h1>
        <h1 style={{color: this.props.themeColor}}>react-redux 取出来的数据</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    themeColor: state.themeColor
  }
}

export default connect(mapStateToProps)(Header)