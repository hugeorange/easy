import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './themeSwitch'

// import { connect } from './react-redux'
import { connect } from 'react-redux'

class Content extends Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor() {
    super()
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
  render() {
    return (
      <div>
        <div>
          context 里面取出来的数据
          <p style={{ color: this.state.themeColor }}>React.js 小书内容</p>
          <ThemeSwitch />
        </div>

        <div>
          react-redux 里面取出来的数据
          <p style={{ color: this.props.themeColor }}>React.js 小书内容</p>
          <ThemeSwitch />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    themeColor: state.themeColor
  }
}

export default connect(mapStateToProps)(Content)