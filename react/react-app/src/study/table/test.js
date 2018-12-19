import React,{Component} from 'react';
import PropTypes from 'prop-types';

import Table from './table'
export default class TestTable extends Component {
    constructor(props) {
        super(props);

        this.rowDatas = [
            {id: 1, name:'...', sex: '男', age: '女', checked: true},
            {id: 1, name:'...', sex: '男', age: '女', checked: true},
            {id: 1, name:'...', sex: '男', age: '女', checked: false},
            {id: 1, name:'...', sex: '男', age: '女', checked: true},
            {id: 1, name:'...', sex: '男', age: '女', checked: false},
            {id: 1, name:'...', sex: '男', age: '女', checked: true},
            {id: 1, name:'...', sex: '男', age: '女', checked: false},
            {id: 1, name:'...', sex: '男', age: '女', checked: true}
        ]
        this.state = {
            totalCount: 7,
            currentPage: 1,
            rowDatas: this.rowDatas,
            checkAll: false,
            // checkAll: undefined,
        }
    }

    addPage = (curPage) => {
        console.log(curPage);
        let arr = [
            {id: 'curPage-' + curPage, name:'...', sex: '男', age: '女', checked: false},
            {id: 'curPage-' + curPage, name:'...', sex: '男', age: '女', checked: false},
            {id: 'curPage-' + curPage, name:'...', sex: '男', age: '女', checked: false},
            {id: 'curPage-' + curPage, name:'...', sex: '男', age: '女', checked: false},
            {id: 'curPage-' + curPage, name:'...', sex: '男', age: '女', checked: false},
            {id: 'curPage-' + curPage, name:'...', sex: '男', age: '女', checked: false},
            {id: 'curPage-' + curPage, name:'...', sex: '男', age: '女', checked: false},
            {id: 'curPage-' + curPage, name:'...', sex: '男', age: '女', checked: false}
        ]
        ++curPage;
        this.rowDatas = [...this.rowDatas, ...arr];
        this.setState({
            currentPage: curPage,
            rowDatas: this.rowDatas,
        })
    }
    saveData = () => {
        console.log(this.state.rowDatas);
    }
    checkAll = (e) => {
        const { rowDatas } = this.state;
        rowDatas.forEach(item => {
            item.checked =  e.target.checked;
        });
        this.setState({
            checkAll: e.target.checked,
            rowDatas: rowDatas,
        })
    }
    checkItem = (e, row, index) => {
        const { rowDatas } = this.state;
        rowDatas[index].checked = e.target.checked;
        this.setState({
            rowDatas,
        })
    }
    renderTable() {
        const {totalCount, currentPage, rowDatas, checkAll} = this.state;
        
        
        this.tableOptions = {
            layout: "fixed",
            totalCount: totalCount,
            currentPage: currentPage,
            addPage: this.addPage,
            columns:[
                {
                    width: "5%",
                    theadRender: () => {
                        return (
                            <input
                            type="checkbox"
                            checked={checkAll}
                            onChange={this.checkAll} />                
                        )
                    },
                    tbodyRender: (row, index) => {
                        console.log(row, index);
                        return (
                            <input 
                            type="checkbox"
                            value={row.checked}
                            checked={row.checked}
                            onChange={(e) => {this.checkItem(e, row, index)}}/>
                        )
                    }
                },
                {
                    label: "ID",
                    key: "id",
                    width: "20%",
                },
                {
                    label: "姓名",
                    key: "name",
                    width: "20%",
                },
                {
                    label: "性别",
                    key: "sex",
                    width: "30%",
                },
                {
                    label: "年龄",
                    key: "age",
                    width: "40%",
                },
                
            ]
        }
        return (
            <Table 
                {...this.tableOptions} 
                rowDatas={rowDatas}
            />
        )
    }

    render() {
        
        return (
            <div>
                {this.renderTable()}
                <button onClick={this.saveData}>提交数据</button>
            </div>
        )
    }
}


