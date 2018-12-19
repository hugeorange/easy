import React,{Component} from 'react';
import PropTypes from 'prop-types';

import './table.css';
export default class Table extends Component {
    componentDidMount() {
        if (this.props.layout === "fixed") {
            this.refs.mwThead.style.width = this.refs.mwThead.offsetWidth - 13 + "px";
        }
    }
    render() {
        const { 
            columns, 
            rowDatas, 
            totalCount, 
            currentPage, 
            addPage,
            layout,
        } = this.props;
        return (
            <div className="table-wrapper">
                <table className={ `mw-table${layout === "fixed" ? " mw-table-fixed" : ""}`}>
                <thead ref="mwThead" className="mw-thead">
                    <tr>
                    {
                        columns.map((item, index) => {
                            return (
                                <th key={index} width={item.width}>
                                    {item.label && item.label}
                                    {item.theadRender && item.theadRender()}
                                </th>
                            )
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        rowDatas.map((itemData, rowIndex) => {
                            return (
                                <tr key={'rowIndex-' + rowIndex}>
                                    {
                                        columns.map((item, colIndex) => {
                                            return (
                                                <td key={'colIndex-' + colIndex} width={item.width}>
                                                    {item.key && itemData[item.key]}
                                                    {item.tbodyRender && item.tbodyRender(itemData, rowIndex)}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    {
                        currentPage && totalCount &&
                        <tr>
                        <td colSpan={columns.length}>
                            {
                                currentPage < totalCount 
                                ? 
                                <span onClick={() => {addPage(currentPage)}}>点击加载更多数据...</span>
                                :
                                <span>没有更多数据了</span>
                             }
                        </td>
                    </tr>
                    }
                </tbody>
            </table>

            </div>
        )
    }
}

 
Table.propTypes = {
    columns: PropTypes.array,
    rowDatas: PropTypes.array,
}

Table.defaultProps = {
    columns: [],
    rowDatas: [],
    layout: "", // 当为fixed时，thead固定，tbody滚动
}

/**
 * 可设置 表头固定的 table组件
 * columns:{
 *     label: 'xxx',
 *     key: 'xxx',
 *     width: '30%',
 *     theadRender: () => {}
 *     tbodyRender: () => {}
 * }
 * 
 * rowDatas: [] , 填充的相应数据，其中每一项的键值与key相对应
 */
