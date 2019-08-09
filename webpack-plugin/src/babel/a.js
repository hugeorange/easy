exports.A = '我是a模块';

var b = require('./b.js');
console.log('在 a.js 之中， 输出的 b模块==> ', b.B);

exports.A = '我是后期修改过的a模块';

console.log('a.js 执行完毕');

