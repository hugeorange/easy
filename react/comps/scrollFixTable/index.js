import React, {Component} from 'react'
import './index.scss'


class TableScrollFixed extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        window.addEventListener('scroll', this.pageScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.pageScroll)
    }

    pageScroll = () => {
        const rect = this.tableWrapRef.getBoundingClientRect()
        const position = rect.top + rect.height

        if (rect.top <= 0 && position >= 30) {
            this.tableWrapRef.classList.add('table-header-sticky')
        } 

        if (rect.top > 0 || position < -60) {
            this.tableWrapRef.classList.remove('table-header-sticky')
        }

        if (rect.top > 0 || (position < 30 && position > -60)) {
            let diff = 30 - position
            this.titleRef.style.transform = `translate3d(0, -${diff}px, 0)`
        } else {
            this.titleRef.style.transform = `translate3d(0, 0, 0)`
        }
    }

    tableBodyScroll = e => {
        const left = e.target.scrollLeft
        this.rightTitleRef.scrollLeft = left
    }


    render() {
        const { headerStrList, statsRowList, leftCol, divW } = this.props
        let lTitle = []
        let lBody = []
        let rTitle = []
        let rBody = []
        if (headerStrList.length && statsRowList.length) {
            let len = headerStrList.length
            lTitle = headerStrList.slice(0, leftCol)
            rTitle = headerStrList.slice(leftCol, len)

            lBody = statsRowList.map(v => v.quotaList.slice(0, leftCol))
            rBody = statsRowList.map(v => v.quotaList.slice(leftCol, len))
        }

        return (
            <div className="table-wrap-views" ref={ref => this.tableWrapRef = ref}>
                <div className="table-views table-views-title" ref={ref => this.titleRef = ref}>
                    <div className="table-header-left">
                        <table border="0" cellSpacing="0" cellPadding="0">
                            <tbody>
                                <tr>
                                    {lTitle.map((v, index) => (
                                        <td key={index}>
                                            <div className="title-cell cell" style={{width: divW[index]}}>{v}</div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="table-header-right" ref={ref => this.rightTitleRef = ref}>
                        <table border="0" cellSpacing="0" cellPadding="0">
                            <tbody>
                                <tr>
                                    {rTitle.map((v, index) => (
                                        <td key={index}>
                                            <div className="title-cell cell" style={{width: divW[index+1]}}>{v}</div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="table-views table-views-body">
                    <div className="table-body-left">
                        <table border="0" cellSpacing="0" cellPadding="0">
                            <tbody>
                                {
                                    lBody.map((tr, trIndex) => (
                                        <tr key={trIndex}>
                                            {tr.map((td, tdIndex) => (
                                                <td key={tdIndex}>
                                                    <div className="body-cell cell" style={{width: divW[tdIndex]}}>{td}</div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="table-body-right" onScroll={this.tableBodyScroll}>
                        <table border="0" cellSpacing="0" cellPadding="0">
                            <tbody>
                                {
                                    rBody.map((tr, trIndex) => (
                                        <tr key={trIndex}>
                                            {tr.map((td, tdIndex) => (
                                                <td key={tdIndex}>
                                                    <div className="body-cell cell" style={{width: divW[tdIndex+1]}}>{td}</div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default TableScrollFixed