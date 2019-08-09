"use strict";

var _c = _interopRequireDefault(require("./c.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ccc = require('./c.js');

console.log(_c["default"], ccc);
setTimeout(function () {
  console.log('sett-->', _c["default"]);
  console.log('ccc->', ccc);
}, 4000);