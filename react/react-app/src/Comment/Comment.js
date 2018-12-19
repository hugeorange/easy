import React,{Component} from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {
    static propTypes = {
        comment:PropTypes.object.isRequired,
        onDeleteComment:PropTypes.func.isRequired,
        index:PropTypes.number.isRequired        
    }
    static defaultProps = {
        comment:{
            username:"大桔子",
            content:"大桔子的首篇文章"
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            timeString:''
        };
    } 
    componentWillMount() {
        this.__updateTimeString();
        this._timer = setInterval( () => {
            this.__updateTimeString();
        },3000) 
    }

    //销毁组件时，清除计时器
    componentWillUnmount() {
        console.log('我销毁了计时器');
        clearInterval(this._timer);
    }
    //时间字符串格式化
    __updateTimeString() {
        const comment = this.props.comment;
        const duration = (Date.now() - comment.createdTime)/1000;
        this.setState({
            timeString:duration > 60 ? `${ Math.round(duration/60) }分钟前` : `${ Math.round(duration)}秒前`
        })
    }
    _getProcessedContent(content) {
        return content
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;")
                .replace(/`([\S\s]+?)`/g, '<code>$1</code>');
    }
    //删除操作
    handleDeleteComment() {
        if(this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index);
        }
    }

    render() {
        const comment = this.props.comment;
        return (
            <div className="comment">
                <div className="comment-user">
                    <span>{comment.username}</span>：
                </div>
                {/* 转换code，用于输入 html 标签 */}
                <p dangerouslySetInnerHTML={{
                    __html: this._getProcessedContent(comment.content)
                   }}>
                </p>               
                <span className="comment-createdtime">{ this.state.timeString }</span> 
                <span className='comment-delete' onClick={this.handleDeleteComment.bind(this)}>删除</span>
            </div>
        )
    }
}
export default Comment;