// import _ from "lodash";

// 并没有 tree shanking 啊
function component() {
  let element = document.createElement("button");
  element.id = 'test'
  return element;
}
document.body.appendChild(component());
var test = document.getElementById('test')
var btns = '测试 import 或者 require.ensure'
test.innerHTML = btns;



test.onclick = function() {
  console.log('启动测试环境')

  import(/* webpackChunkName: "esModule" */ './src/esModule').then(module => {
    console.log('esModule-->', module)
  })

  // import(/* webpackChunkName: "common" */ './src/common').then(module => {
  //   console.log('common-->', module)
  // })


  // import(/* webpackChunkName: "testimport" */ './src/comps/a').then(module => {
  //   console.log(module)
  // })

  // require.ensure([], require => {
  //   var result = require('./src/comps/b')
  //   console.log(result)
  // }, 'testrequire')

}


console.log('环境--->', process, ENVVIROMENT)