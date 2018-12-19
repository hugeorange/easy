import React,{Component, PropTypes} from 'react';
import MultiItems from './MultiItems';
import './index.css';

export default class MultiSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectList: [],
            saveFlag: false,
        };

        this.index = 1; // 全局索引，作为key值
        this.selectData = []; // 保存的优惠券数据
        this.selectIndex = ''; // 点击的index在列表中的索引
        ['addList', 'deleteItem', 'submitData', 'saveData'].forEach(method => {
            this[method] = this[method].bind(this);
        });
    }
    componentWillMount() {

    }
    componentWillUpdate() {

    }
    componentDidUpdate() {

    }
    // 组件接收到新的 props 时调用
    componentWillReceiveProps (nextProps) {
        const {selectList} = this.state;
        selectList[this.selectIndex].secondSelect = nextProps.secondSelect;
        this.setState({
            selectList
        })
    }
    
    componentDidMount() {
        const { firstSelect, secondSelect, firstValue, secondValue } = this.props;
        const obj = {
            counter: 0,
            firstSelect: firstSelect,
            secondSelect: secondSelect,
        }
        const selectObj = {
            mark: obj.counter,
            [firstValue]: '',
            [secondValue]: '',
        }

        this.selectData.push(selectObj);
        this.setState({
            selectList: [obj],
        })
    }
    // 添加列表项
    addList() {
        const {selectList} = this.state;        
        const { firstSelect, firstValue, secondValue, maxLength } = this.props;

        const obj = {
            counter: this.index++,
            firstSelect: firstSelect,
            secondSelect: [],
        }

        // 父组件需要保存的优惠券数据结构
        const selectObj = {
            mark: obj.counter,
            [firstValue]: '',
            [secondValue]: '',
        }
        
        if(selectList.length >= maxLength) {
            alert("不能添加超过十张优惠券！")
        } else {
            selectList.push(obj); // 展示列表
            this.selectData.push(selectObj); // 用户选择的数据
            this.setState({ 
                selectList, 
                saveFlag: false
            })
        }
    }
    // 删除项
    deleteItem(index, e, ev) {
        const {selectList} = this.state;
        selectList.splice(index, 1);
        this.setState({ selectList });
        this.selectData.splice(index, 1);
    }
    // 子组件上报而来的数据
    submitData(key, value, index) {
        const {fetchData, firstValue, secondFetch} = this.props;
        if(secondFetch && key === firstValue) {
            this.selectIndex = index;
            fetchData(value); // 用第一个下拉框选中的值，去请求第二个下拉框的数据
        }
        this.selectData[index][key] = value;
    }
    saveData() {
        const { firstValue, secondValue } = this.props;
        const dataVail = this.selectData.every(item => {
            return item[firstValue] && item[secondValue];
        });

        if(dataVail) {
            let postData = JSON.parse(JSON.stringify(this.selectData));
            postData.forEach(item => {
                delete item.mark;
            })
            return postData;
        } else {
            this.setState({
                saveFlag: true
            });
        }
    }

    render() {
        const {firstDefaultText, secondDefaultText, firstValue, secondValue, labelText} = this.props;
        const {selectList, saveFlag} = this.state;
        const len = selectList.length;
        
        return (
            <div>
                {
                    selectList.map((item, index) => {

                        return <MultiItems
                                    key={item.counter}
                                    firstSelect={item.firstSelect}
                                    secondSelect={item.secondSelect}
                                    firstDefaultText={firstDefaultText}
                                    secondDefaultText={secondDefaultText}
                                    deleteItem={this.deleteItem}
                                    index={index}
                                    len={len}
                                    submitData={this.submitData}
                                    firstValue={firstValue}
                                    secondValue={secondValue}
                                    saveFlag={saveFlag}
                                    labelText={labelText}
                                />
                    })
                }
            </div>
        )
    }
}


MultiSelect.propTypes = {
    firstSelect: PropTypes.array,
    secondSelect: PropTypes.array,
    submitData: PropTypes.func,
}

MultiSelect.defaultProps = {
    firstSelect: [],
    secondSelect: [],
    firstDefaultText: '请选择',
    secondDefaultText: '请选择',
    firstValue: 'type', // 需要提交服务端保存的 key
    secondValue: 'level', 
    maxLength: 10, // 不能添加超过10个列表
    secondFetch: true,
    fetchData: () => {}
}