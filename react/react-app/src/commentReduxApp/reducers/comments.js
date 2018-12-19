import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'


/**
 * reducer 用来描述数据的形态和相应的变更
 */

//  action types
// 初始化评论数据
const INIT_COMMENTS = "INIT_COMMENTS";

// 添加评论
const ADD_COMMENT = "ADD_COMMENT";

// 删除评论
const DELETE_COMMENT = "DELETE_COMMENT"


// action creator
export const initComments = comments => {
    return { type: INIT_COMMENTS, comments }
}

export const addComment = comment => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const deleteComment = commentIndex => {
    return {
        type: DELETE_COMMENT,
        commentIndex
    }
}


// reducers 书写规范



function rootReducer(state = {}, action) {
    switch (action.type) {
        case INIT_COMMENTS:
            return { comments: action.comments }
        case ADD_COMMENT:
            return {
                comments: [...state.comments, action.comment]
            }
        case DELETE_COMMENT:
            return {
                comments: [
                    ...state.comments.slice(0, action.commentIndex),
                    ...state.comments.slice(action.commentIndex + 1)
                ]
            }
        default:
            return state
    }
}

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)))