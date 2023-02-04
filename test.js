const clc = require('cli-color');
// const waitSync = require('wait-sync');
// let arr = new Array(50).fill(' ');
// const hero = '|';
// for (let i = 1; i < arr.length; i++) {
//   arr.splice(i - 1, 1, ' ');
//   arr.splice(i, 1, hero);
//   console.log(arr.join(''));
//   waitSync(1);
//   console.clear();
// }
// const { EOL } = require('os');

const arr1 = [1, 2, 3, 4];
const arr2 = [5, 6, 7, 8];
const arr3 = [11, 12, 23, 45];
const arr4 = [arr2, arr1, arr3];
// console.log(arr4.map((el) => el.join('')).join(EOL));

console.log(clc.yellow('Hello world!'));
