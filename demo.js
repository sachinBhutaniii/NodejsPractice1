// console.log("global object", global);

// node has this instead of window object
// this global object has the acces to the functions like settimeout and setInterval ,

/*
global.setTimeout
is same as 
setTimeout
*/

// global.setTimeout(() => {
//   console.log("Global set Timeout");
// }, 2000);

// setTimeout(() => {
//   console.log("Set Timeout");
// }, 2000);

// global.setInterval(() => {
//   console.log("Global set interval");
// }, 2000);

// setInterval(() => {
//   console.log("Set interval");
// }, 2000);

//********

console.log("Directory name"); // to get name of directory
console.log(__dirname);

console.log("Filename name"); // to get complete name of directory including file name
console.log(__filename);

// we cant access things like DOM methods like document.getElementById or document.querySelector  because it is in the window object and we dont even need it because we dont use these things in backend
