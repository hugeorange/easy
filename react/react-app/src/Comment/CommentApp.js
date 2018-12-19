import React,{Component} from 'react';
import PropTypes from 'prop-types';

import CommentInput from './CommentInput';
import CommentList from './CommentList';

import wrapWithLoadData from './hoc/LocalStorageActions'

import './index.css'


class CommentApp extends Component{
    static propTypes = {
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        // 原方式
        // this.state = {
        //     comments:[]
        // }

        // hoc方式
        this.state = {
            comments: props.data
        }
    }
    componentWillMount() {
        // this._loadComment();
    }

    //私有方法--读评论
    _loadComment() {
        let comments = localStorage.getItem('comments');
        if(comments) {
            comments = JSON.parse(comments);
            this.setState({ comments });
        }
    }
    //私有方法--写评论
    _saveComment(comments) {
        localStorage.setItem('comments',JSON.stringify(comments));
    }

    handleSubmitComment(comment){
        console.log("comment:", comment);
        if(!comment) return;
        if(!comment.username) return alert('请输入用户名！');
        if(!comment.content) return alert('请输入评论内容！');

        // 直接改变 state 也可以， react-redux 会进行优化
        // 这个原则是为了 shouldComponent 的优化和变化的跟踪
        const comments = this.state.comments;
        comments.push(comment);
        this.setState({ comments });
        // this._saveComment(comments);
        this.props.saveData(comments); // hoc 方式  
    }

    //删除评论方法
    handleDeleteComment(index){
        const comments = this.state.comments;
        comments.splice(index,1);
        this.setState({ comments });
        // this._saveComment(comments);  
        this.props.saveData(comments); // hoc
    }
    render() {
        return (
            <div className="wrapper">
                <CommentInput 
                    onSubmit={this.handleSubmitComment.bind(this)}
                />
                <CommentList 
                    ref={(list) => {this.list = list}} 
                    onDeleteComment={this.handleDeleteComment.bind(this)}
                    comments={this.state.comments}
                />
            </div>
        )
    }
}

CommentApp = wrapWithLoadData(CommentApp, 'comments')
export default CommentApp;
