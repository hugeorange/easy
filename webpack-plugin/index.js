import _ from "lodash";
import React from "react";
import ReactDom from "react-dom";
import { cube } from "./src/math.js";

// 并没有 tree shanking 啊
function component() {
  let element = document.createElement("div");
  element.innerHTML = ["Hello webpack!", "5 cubed is equal to " + cube(5)].join("\n\n");
  return element;
}
console.log(222222222222);
document.body.appendChild(component());
