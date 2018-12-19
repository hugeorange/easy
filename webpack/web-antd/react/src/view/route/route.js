import React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';
import Loadable from 'react-loadable';

import PageC from '@/view/pages/test/PageC';
import Page1 from '@/view/pages/test/Page1';
import Page2 from '@/view/pages/test/Page2';
import Page3 from '@/view/pages/test/Page3';


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
            <Route exact path="/home" component={Page1} />
            <Route exact path="/about" component={Page2} />
            <Route exact path="/contact" component={Page3} />
            <Route exact path="/home/menu1" component={PageC} />
            <Route exact path="/home/menu2" component={PageC} />
            <Route exact path="/home/menu5" component={PageC} />


            <Route exact path="/home/menu3/meun3-1" component={PageC} />
            <Route exact path="/home/menu3/meun3-2" component={PageC} />
            <Route exact path="/home/menu3/meun3-3" component={PageC} />
            <Route exact path="/home/menu4/meun4-1" component={PageC} />
            <Route exact path="/home/menu4/meun4-2" component={PageC} />
            <Route exact path="/home/menu4/meun4-3" component={PageC} />


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


// <Route exact path="/about" component={
//     Loadable({
//         loader: () => import(/* webpackChunkName: "BuC1" */ '@/view/pages/test/BuC1'),
//         loading: Loading,
//         delay: 300,
//     })
// } />
//     <Route exact path="/contact" component={
//         Loadable({
//             loader: () => import(/* webpackChunkName: "BuC2" */ '@/view/pages/test/BuC2'),
//             loading: Loading,
//             delay: 300,
//         })
//     } />