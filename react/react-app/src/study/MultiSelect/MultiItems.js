import React,{Component} from 'react';
import Select from './Select';

export default class MultiItems extends Component {
    constructor(props) {
        super(props);
        const { firstValue, secondValue } = this.props;
        this.state = {
            [firstValue]: '',
            [secondValue]: '',
        };
        
        ['selectFirst',
         'selectSecond',
        ].forEach(method => {
            this[method] = this[method].bind(this);
        });
    }

    selectFirst(value) {
        const { submitData, index, firstValue } = this.props;
        this.setState({
            [firstValue]: value,
        })
        submitData(firstValue, value, index); // 向父组件上报数据
    }

    selectSecond(value) {
        const { submitData, index, secondValue } = this.props;
        this.setState({
            [secondValue]: value,
        })
        submitData(secondValue, value, index); // 向父组件上报数据
    }

    render() {
        const {firstSelect, secondSelect, firstDefaultText, secondDefaultText, firstValue, secondValue, deleteItem, len, index, saveFlag, labelText } = this.props;        

        return (
            <div className="wrapper">
                <span className="listtips">{labelText}</span>

                <Select 
                    options={firstSelect}
                    defaultValue={firstDefaultText}
                    handleSelect={this.selectFirst}
                />

                <Select 
                    options={secondSelect}
                    defaultValue={secondDefaultText}
                    handleSelect={this.selectSecond}
                />

                { len > 1 && <button className="btndelete" onClick={(e, ev) => {deleteItem(index, e, ev)}}>删除</button> }
                { (saveFlag && (!this.state[firstValue] || !this.state[secondValue])) && <div className="error-tips">请完整选择优惠券</div> }                
            </div>
        )
    }
}
