import _ from "lodash";
// import React from "react";
// import ReactDom from "react-dom";
import { cube } from "./src/math.js";

// import cache from './src/comps/index'

// 并没有 tree shanking 啊
function component() {
  let element = document.createElement("div");
  element.id = 'test'
  // element.innerHTML = ["Hello webpack!", "5 cubed is equal to " + cube(5)].join("\n\n");
  return element;
}
document.body.appendChild(component());
var test = document.getElementById('test')
var divs = '测试 import 或者 require.ensure'
test.innerHTML = divs;



test.onclick = function() {
  console.log('启动测试环境')
  import(/* webpackChunkName: "testimport" */ './src/comps/a').then(module => {
    console.log(module)
  })

  require.ensure([], require => {
    var result = require('./src/comps/b')
    console.log(result)
  }, 'testrequire')

}


console.log('环境--->', process, ENVVIROMENT)