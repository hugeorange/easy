import React from 'react';
import Layout from "@/view/layout/layout";

// 子组件-路由组件
class PageC extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <div className="page-container">
                    关于
                </div>
            </Layout>
        )
    }
}
export default PageC;
