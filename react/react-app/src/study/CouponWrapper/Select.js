import React,{Component, PropTypes} from 'react';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };

        ['handleSelect'].forEach(method => {
            this[method] = this[method].bind(this);
        });
    }

    createOptions() {
        const options = this.props.options;

        return options.map((item) => {            
            return (
                <option key={item.value} value={item.value} >{item.text}</option>
            )
        })
    }
    // 选中事件
    handleSelect(e) {
        // 获取select选中文本，主要还是原生知识需要扎实，主要考察 select 元素的原生知识
        // const selectedIndex = e.target.options.selectedIndex;
        // const {value, text} = e.target.options[selectedIndex];
        const value = e.target.value;
        this.props.handleSelect(value);
        this.setState({
            value: e.target.value,
        })
    }

    render() {
        const {defaultValue} = this.props;
        const {value} = this.state;
        return (
            <select value={value} onChange={this.handleSelect}>
                <option value="">{defaultValue}</option>
                {this.createOptions()}
            </select>
        )
    }
}


// React 16将从核心库里去除 propTypes， 需要从单独的prop-types
Select.propTypes = {
    options: PropTypes.array,
    defaultValue: PropTypes.string,
    handleSelect: PropTypes.func,
};
Select.defaultProps = {
    options: [],
    defaultValue: '请选择',
};

export default Select;

/**
 * 
 * FormArea.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  elements: PropTypes.array,
  updateElements: PropTypes.array,
  onChange: PropTypes.func,
};
 */