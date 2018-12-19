import Icon from '@/icon.png';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement("button");
    element.innerHTML = _.join(['Hello', 'webpack', 'hotModu555555leReplacement'], ' ');

    btn.innerHTML = "我是一个button";

    btn.onclick = function () {
        import(/* webpackChunkName: "print" */ './print').then(module => {
            var print = module.default;
            print();
        });
        // 将图像添加到我们现有的div
        var myIcon = new Image();
        console.log("Icon:", Icon);
        myIcon.src = Icon;
        element.appendChild(myIcon);
    }
    element.appendChild(btn);
    element.classList.add('hello');
    return element;
}

function getComponrnt() {
    var div = document.createElement('div');
    var div1 = document.createElement('div');
    var btn = document.createElement("button");
    btn.innerHTML = "我是一个bun=====";
    var myIcon = new Image();
    myIcon.src = Icon;
    div1.appendChild(myIcon);
    div.appendChild(btn);
    div.appendChild(div1);

    btn.onclick = function () {
        // code split 的两种加载方式 https://segmentfault.com/a/1190000009820646
        import(/* webpackChunkName: "print" */ './print').then(module => {
            console.log(module);
            var print = module.default;
            print();
        });

        // require.ensure([], function (require) {
        //     var module = require('./print');
        //     var print = module.default;
        //     print();
        // }, 'print');
        // 1）升级webpack2的另外一个重要因素就是：原本采用require.ensure来异步加载代码时无法捕获到组件拉取失败的回调，
        // 需要单独引入一个插件require('require-error-handler-webpack-plugin')来解决, 
        // 但是升级了webpack2之后，原生就已经支持了，所以不需要引入这个插件了。
    }

    return div;
}

export default getComponrnt;