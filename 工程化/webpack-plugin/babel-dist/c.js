"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var ddd = {
  aaa: '你好啊'
};
var ccc = {
  c: '我是commonjs 规范'
};
setTimeout(function () {
  ddd.aaa = '我不好啊';
  ccc = '我是改变过的 ccc';
}, 1000);
var _default = ddd;
exports["default"] = _default;
exports.ccc = ccc;