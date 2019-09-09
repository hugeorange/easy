import React from 'react';
import BrowserHistory from '@/util/history';

// import { withRouter } from "react-router-dom";
// import PropTypes from "prop-types";


class TestRoute extends React.Component {
    // static contextTypes = {
    //     router: PropTypes.object
    // }
    constructor(props) {
        super(props);
        console.log(props, "BrowserHistory", BrowserHistory);
    }
    render() {
        return (
            <div>我是测试 react route的组件</div>
        )
    }
}
export default TestRoute;
// export default withRouter(TestRoute);
