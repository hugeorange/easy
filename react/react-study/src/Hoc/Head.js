import React from 'react';
import Withhead from './Withhead';

class Head extends React.Component {
    render() {
        // console.log(this.props);
        return (
            <div>我是一个普通数据</div>
        )
    }
}
export default Withhead(Head, '高阶组件的自定义标题');
