import React,{Component} from 'react';
import Select from './Select';
import './index.css';

class CouponWrapper extends Component{
    constructor() {
        super();
        this.state = {
            couponList: [],
            saveFlag: false,
        };

        this.quantype =[
            {text:"抵扣券", value: '1'},
            {text:"代金券", value: '2'},
            {text:"菜品卷", value: '3'},
            {text:"万能券", value: '4'},
            {text:"异能券", value: '5'},
        ];

        this.quanLevel = [
            {text:"一级", value: '1'},
            {text:"二级", value: '2'},
            {text:"三级", value: '3'},
            {text:"四级", value: '4'},
            {text:"五级", value: '5'},
        ];

        // 用作唯一标识的key
        this.index = 1;
        // 保存的优惠券数据
        this.selectData = [];

        ['addCoupon',
         'deleteQuan',
         'submitData',
         'saveCouponData',
        ].forEach(method => {
            this[method] = this[method].bind(this);
        });
    }

    componentDidMount() {
        const obj = {
            counter: 0,
            quantype: this.quantype,
            quanLevel: this.quanLevel,
        }
        const selectObj = {
            mark: obj.counter,
            type: '',
            level: '',
        }

        this.selectData.push(selectObj);
        this.setState({
            couponList: [obj],
        })
    }

    addCoupon() {
        const {couponList} = this.state;        
        const obj = {
            counter: this.index++,
            quantype: this.quantype,
            quanLevel: this.quanLevel,
        }

        // 父组件需要保存的优惠券数据结构
        const selectObj = {
            mark: obj.counter,
            type: '',
            level: '',
        }
        
        if(couponList.length >= 10) {
            alert("不能添加超过十张优惠券！")
        } else {
            couponList.push(obj); // 展示列表
            this.selectData.push(selectObj); // 保存数据
            this.setState({
                couponList
            })
        }
        this.setState({
            saveFlag: false
        })
    }
    // 删除优惠券
    deleteQuan(index, e, ev) {
        const {couponList} = this.state;
        console.log("我是索引：", index);
        couponList.splice(index, 1);
        this.setState({couponList});
        this.selectData.splice(index, 1);
    }

    // 子组件上报而来的选择的数据
    submitData(key, value, index) {
       this.selectData[index][key] = value;
    }
    saveCouponData() {
        console.log(this.selectData);
        const dataVail = this.selectData.every(item => {
            return item.type && item.level;
        });

        if(dataVail) {
            console.log("提交数据");
        } else {
            this.setState({
                saveFlag: true
            });
            console.log("错误展示"); 
        }
    }
    render() {
        const {couponList, saveFlag} = this.state;
        const length = couponList.length;
        return (
            <div>
                <button className="btn" onClick={this.addCoupon}>添加优惠券</button>
                <div className="">
                    {
                        couponList.map((item, index) => {
                            return <CreateList
                                        key={item.counter}
                                        len={length}
                                        index={index}
                                        saveFlag={saveFlag}
                                        quantype={item.quantype}
                                        quanLevel={item.quanLevel}
                                        deleteQuan={this.deleteQuan}
                                        submitData={this.submitData}
                                    />
                        })
                    }
                </div>
                <button className="btn" onClick={this.saveCouponData}>保存数据</button>
            </div>
        )
    }
}

class CreateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            level: '',
        };
        ['selectType',
         'selectLevel',
        ].forEach(method => {
            this[method] = this[method].bind(this);
        });
    }

    selectType(value, text) {
        const { submitData, index } = this.props;
        this.setState({
            type: value,
        })
        submitData('type', value, index); // 向父组件上报数据
    }

    selectLevel(value, text) {
        const { submitData, index } = this.props;
        this.setState({
            level: value,
        })
        submitData('level', value, index); // 向父组件上报数据
    }

    render() {
        const { len, index, quantype, quanLevel, deleteQuan, submitData, saveFlag } = this.props;
        const { type, level } = this.state;
        console.log("type,level:", type, level, (saveFlag && (!type || !level)))
        return (
            <div className="wrapper">
                <span className="listtips">第{index}组优惠券</span>
                <Select 
                    options={quantype}
                    defaultValue="优惠券类别"
                    handleSelect={this.selectType}
                />
                <Select 
                    options={quanLevel}
                    defaultValue="优惠券等级"
                    handleSelect={this.selectLevel}
                />
                { len > 1 && <button className="btndelete" onClick={(e, ev) => {deleteQuan(index, e, ev)}}>删除</button> }
                { (saveFlag && (!type || !level)) && <div className="error-tips">请完整选择优惠券</div> }                
            </div>
        )
    }
}

export default CouponWrapper;