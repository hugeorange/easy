/*
import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import printMe from './print.js';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement("button");
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = "click me and check this console";
    btn.onclick = function() {
      printMe();
    }
    element.classList.add('hello');

    // 将图像添加到我们现有的div
    var myIcon = new Image();
    console.log("Icon:", Icon);
    myIcon.src = Icon;
    element.appendChild(myIcon);
    element.appendChild(btn);
    return element;
}

  document.body.appendChild(component());
  console.log(process);
  console.log(module);
  console.log("module");
  if(module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module');
      printMe();
    })
  }
  */

  /**
   * 动态导入 chunk import()   require.ensure()
   */

  function getComponent() {
    return import( /* webpackChunkName: "lodash" */ 'lodash').then(_ => {
      var element = document.createElement('div');
      element.innerHTML = _.join(['Hello', 'webpack', 'i am orange'], ' ');
      return element;
     }).catch(error => 'An error occurred while loading the component');
  }

  getComponent().then( component => {
    document.body.appendChild(component);
  })