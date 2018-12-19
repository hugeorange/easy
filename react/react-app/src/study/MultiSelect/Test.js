import React, {Component} from 'react';
import MultiSelect from './index.js';
import axios from 'axios';
export default class Test extends Component {
    constructor() {
        super();
        this.state = {
            quantype: [
                {text:"抵扣券", value: '1'},
                {text:"代金券", value: '2'},
                {text:"菜品卷", value: '3'},
                {text:"万能券", value: '4'},
                {text:"异能券", value: '5'},
            ],
            quanLevel: [],
        };

        ['saveData', 'addList', 'fetchData'].forEach(method => {
            this[method] = this[method].bind(this);
        })
    }
    componentDidMount() {

    }

    // 获取第二个下拉选择框的数据
    fetchData(id) {
        axios.get(`../dataBase/data${id}.json`).then(res => {
            console.log(res);
            this.setState({
                quanLevel: res.data.data,
            })
        })
    }
    // 增加优惠券
    addList() {
        this.refs.multiSelect.addList();
    }
    // 保存用户select选择的数据
    saveData() {
        const data = this.refs.multiSelect.saveData(); 
        console.log("需要提交的数据：", data);
    }
    render() {
        const {quantype, quanLevel} = this.state;        
        return (
            <div>
                <div>测试MultiSelect组件</div>
                <hr/>
                <button className="addList" onClick={this.addList}>添加</button>
                <MultiSelect
                        firstSelect={quantype}
                        secondSelect={quanLevel}
                        fetchData={this.fetchData}
                        firstDefaultText={'请选择优惠券'}
                        secondDefaultText={'请选择优惠券等级'}
                        firstValue='k'
                        secondValue='v'
                        ref="multiSelect"
                        labelText='请选择您需要的优惠券'
                />
                <div><button onClick={this.saveData}>保存数据</button></div>
            </div>
        )
    }
}