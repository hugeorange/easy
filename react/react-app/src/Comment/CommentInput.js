import React,{Component} from 'react';
import PropTypes from 'prop-types';

import wrapWithLoadData from './hoc/LocalStorageActions'

class CommentInput extends Component {
    static propTypes = {
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            // username:'',
            username: props.data,
            content:''
        }
    }
    componentWillMount() {
        // this._loadUserName();
    }
    componentDidMount() {
        this.textarea.focus();
    }
    handleUsernameChange(e){
        this.setState({
            username:e.target.value
        });
    }
    handleContentChange(e){
        this.setState({
            content:e.target.value
        });
    }
    handleSubmit(){
        if(this.props.onSubmit){
            let createdTime = new Date() - 0;
            const {username,content} = this.state;
            this.props.onSubmit({
                username,
                content,
                createdTime
            });
        }
        this.setState({
            content:''            
        })
    }

    //存储用户名
    _saveUserName(username) {
        localStorage.setItem('username',username);
    }
    //读取用户名
    _loadUserName(username) {
        const name = localStorage.getItem('username');
        if(name){
            this.setState({username:name});
        }
    }
    
    //持久化存储 username
    handleUsernameBlur(e) {
        this._saveUserName(e.target.value)
        this.props.saveData(e.target.value);
    }
    render() {
        return (
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">用户名：</span>
                    <div className="comment-field-input">
                        <input 
                            value={this.state.username} 
                            onBlur={this.handleUsernameBlur.bind(this)} 
                            onChange={this.handleUsernameChange.bind(this)} 
                            placeholder="请输入用户名"
                        />
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容：</span>
                    <div className="comment-field-input">
                        <textarea 
                            ref={(textarea)=>{this.textarea=textarea}} 
                            value={this.state.content} 
                            onChange={this.handleContentChange.bind(this)} 
                            placeholder="请输入评论内容"
                        />
                    </div>
                </div>
                <div className="comment-field-button">
                    <button 
                        onClick={this.handleSubmit.bind(this)}
                    >发布</button>
                </div>
            </div>
        )
    }
}

CommentInput = wrapWithLoadData(CommentInput, 'username');
export default CommentInput
