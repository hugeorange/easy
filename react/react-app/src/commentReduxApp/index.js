import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/comments'
import CommentApp from './containers/commentApp'
import './index.css'


export default class CommentReduxApp extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <CommentApp />
            </Provider>
        )
    }
}