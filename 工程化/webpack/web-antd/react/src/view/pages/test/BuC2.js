import React from 'react';
import Layout from "@/view/layout/layout";

class BComponent extends React.Component {
    constructor(props) {
        super(props);
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
                </div>
            </Layout>
        )
    }
}
export default BComponent;
