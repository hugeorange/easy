import React from 'react';
import ReactDOM from 'react-dom';

// 未用redux版本的
// import CommentApp from './Comment/CommentApp';

// redux 学习
// import ReduxApp from './Comment/redux/index';

// react-redux版本
import CommentReduxApp from './commentReduxApp';


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div>
        {/* <CommentApp/> */}

        {/* <ReduxApp/> */}

        <CommentReduxApp/>
    </div>
    , 
    document.getElementById('root')
);

registerServiceWorker();
