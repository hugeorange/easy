//b.js   
exports.B = '我是b模块';

var a = require('./a.js');
console.log('在 b.js 之中，输出a模块 ==>', a.A);

exports.B = '我是修改后的b模块';
console.log('b.js 执行完毕');

