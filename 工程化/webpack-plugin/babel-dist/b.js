"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aaa = exports["default"] = void 0;
var aaa = '我是aaa';
exports.aaa = aaa;
var bbb = '我是bbb';
var ccc = '我是ccc'; // module.exports = {
//     aaa,
//     bbb
// }

var _default = bbb;
exports["default"] = _default;
exports.ccc = ccc;
setTimeout(function () {
  console.log('aaa-->', aaa);
}, 5000);