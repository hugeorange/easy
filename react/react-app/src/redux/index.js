import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Provider } from './react-redux'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'


import Header from './header'
import Content from './content'
import './index.css'


function createStore111(reducer) {
  let state = null;
  const listeners = [];
  const subscribe = (listener) => listeners.push(listener);
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    console.log(listeners);
    listeners.forEach((listener) => listener())
  }
  dispatch({}) // 初始化state
  return { getState, dispatch, subscribe }
}

const themeReducer = (state, action) => {
  if (!state) {
    return { themeColor: 'red', themeColor2: 'xxx' }
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

const store = createStore(themeReducer, composeWithDevTools());


class ReduxApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>        
          <Header test="111"/>
          <Content />
        </div>
      </Provider>
    )
  }
}

export default ReduxApp;
