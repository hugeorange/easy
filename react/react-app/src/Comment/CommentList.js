import React,{Component} from 'react';
import Comment from './Comment';

class CommentList extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    }
    static defaultProps = {
        comments:[]
    }

    handleDeleteComment(index, comment) {
        if(this.props.onDeleteComment) {
            this.props.onDeleteComment(index);
        }
    }
    render() {
        return (
            <div>
                {this.props.comments.map((comment,i) => {
                    return (
                        <Comment 
                            key={i} 
                            index={i} 
                            onDeleteComment={this.handleDeleteComment} 
                            comment={comment}
                        />
                    )
                })}
            </div>
        )
    }
}

export default CommentList;

