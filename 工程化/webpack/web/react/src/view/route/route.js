import React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';
import Loadable from 'react-loadable';

import PageC from '@/view/pages/test/PageC';

/**
 * <Switch>的独特之处是独它仅仅渲染一个路由。
 * <Route> 每一个包含匹配地址(location)的<Route>都会被渲染。
 * 如果需要同时渲染多个路由的话可用 div 包裹 <Route>
 * 只有 Route 可以渲染组件
 */

const Loading = (props) => {
    if (props.error) {
        return <div className="load-page">Error! <button onClick={props.retry}>Retry</button></div>;
    } else if (props.pastDelay) {
        return <div className="load-page">Loading...</div>;
    } else {
        return null;
    }
}

/**
 * Loadable API研究下
 * 
 */
const PageRoute = () => {
    return (
        <Switch>
            <Route exact path="/home/menu1" component={PageC} />
            <Route exact path="/home/menu2" component={
                Loadable({
                    loader: () => import(/* webpackChunkName: "BuC1" */ '@/view/pages/test/BuC1'),
                    loading: Loading,
                    delay: 300,
                })
            } />
            <Route exact path="/home/menu3" component={
                Loadable({
                    loader: () => import(/* webpackChunkName: "BuC2" */ '@/view/pages/test/BuC2'),
                    loading: Loading,
                    delay: 300,
                })
            } />
            <Route exact path="/home/menu3/meun3-1" component={PageC} />
            <Route exact path="/home/menu3/meun3-2" component={PageC} />
            <Route exact path="/home/menu3/meun3-3" component={PageC} />
            <Route exact path="/home/menu4/meun4-1" component={PageC} />
            <Route exact path="/home/menu4/meun4-2" component={PageC} />
            <Route exact path="/home/menu4/meun4-3" component={PageC} />


            <Route exact path="/home/menu5" component={PageC} />
            <Route exact path="/about/menu1" component={PageC} />
            <Route exact path="/about/menu2" component={PageC} />
            <Route exact path="/about/menu3" component={PageC} />
            <Route exact path="/about/menu4" component={PageC} />
            <Route exact path="/about/menu5" component={PageC} />
            <Route exact path="/contact/menu1" component={PageC} />
            <Route exact path="/contact/menu2" component={PageC} />
            <Route exact path="/contact/menu3" component={PageC} />
            <Route exact path="/contact/menu4" component={PageC} />
            <Route exact path="/contact/menu5" component={PageC} />
            
            <Route render={() => <h1>404 Page not found</h1>} />
        </Switch>
    )
}
export default PageRoute;
