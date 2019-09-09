import React from 'react';
import Layout from "@/view/layout/layout";
import TestRoute from "./TestRouter";

// 子组件-路由组件
class PageC extends React.Component {
    constructor(props) {
        super(props);
        console.log("props:", props);
    }

    render() {
        return (
            <Layout>
                <div className="page-container">
                    <div className="h-500">{JSON.stringify(this.props.match)}</div>
                    <div className="h-500">{JSON.stringify(this.props.match)}</div>
                    <div className="h-500">{JSON.stringify(this.props.match)}</div>
                    <div className="h-500">{JSON.stringify(this.props.match)}</div>
                    <div className="h-500">{JSON.stringify(this.props.match)}</div>
                    <div className="h-500">{JSON.stringify(this.props.match)}</div>
                    <div className="h-500">{JSON.stringify(this.props.match)}</div>
                    <div className="h-500">{JSON.stringify(this.props.match)}</div>
                    <TestRoute/>
                </div>
            </Layout>
        )
    }
}
export default PageC;
