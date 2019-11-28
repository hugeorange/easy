
import { flatten } from "lodash";
// import flatten from "lodash/flatten";

let arr = [1, [2, 3], [4, [5]]];
let result = flatten(arr);

console.log('---->', result, _)