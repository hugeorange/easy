import React, { Component } from 'react'
import { connect } from 'react-redux';
import { initComments, deleteComment, addComment } from '../reducers/comments'

import CommentInput from '../comps/CommentInput'
import CommentList from '../comps/CommentList'

class CommentApp extends Component {
	constructor() {
		super()
		this.state = {
			username: ''
		}
	}
	componentWillMount() {
		this._loadUsername()
		this._loadComments()
	}

	_loadUsername() {
		const username = localStorage.getItem('username')
		if (username) {
			this.setState({ username })
		}
	}
	_saveUsername(username) {
		localStorage.setItem('username', username)
	}

	handleSubmitComment(comment) {
		if (!comment) return
		if (!comment.username) return alert('请输入用户名')
		if (!comment.content) return alert('请输入评论内容')
		const { comments } = this.props
		const newComments = [...comments, comment]

		localStorage.setItem('comments', JSON.stringify(newComments))

		if (this.props.onSubmit) {
			this.props.onSubmit(comment)
		}
	}

	_loadComments() {
		let comments = localStorage.getItem('comments')
		console.log(comments);
		comments = comments ? JSON.parse(comments) : []

		// connect 进来的函数
		this.props.initComments(comments)
	}
	handleDeleteComment(index) {
		const { comments } = this.props
		const newComments = [
			// ...comments.splice(index, 1), splice 会改变原数组

			// slice 会生成一个新数组，将第 index 位置的元素舍弃掉
			...comments.slice(0, index),
			...comments.slice(index + 1)
		]
		// 上面删除的仅仅是为了存 localstorage
		localStorage.setItem('comments', JSON.stringify(newComments))
		// 为了删除 state 里的数据更新视图
		if (this.props.onDeleteComment) {
			this.props.onDeleteComment(index);
		}
	}

	render() {
		return (
			<div className='wrapper'>
				<CommentInput
					username={this.state.username}
					onUserNameInputBlur={this._saveUsername.bind(this)}
					onSubmit={this.handleSubmitComment.bind(this)}
				/>
				<CommentList
					comments={this.props.comments}
					onDeleteComment={this.handleDeleteComment.bind(this)}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		comments: state.comments
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSubmit: comment => {
			dispatch(addComment(comment))
		},
		initComments: comments => {
			dispatch(initComments(comments))
		},
		onDeleteComment: index => {
			dispatch(deleteComment(index))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentApp)