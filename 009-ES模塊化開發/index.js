// ===== 之前的寫法 CommonJS =====

// const moduleA = require('./module/moduleA')
// console.log(moduleA);
// console.log(moduleA.sum);

// =====之前的寫法 CommonJS =====


import moduleA from "./module/moduleA.js";
import {moduleB} from "./module/moduleB.js";

console.log(moduleA.d);
console.log(moduleB.getName());