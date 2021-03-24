/* const xyz = require("./people");

 // when we require a file node will automatically node will find the file and will run it

 console.log(xyz); // returns an empty object
 */

const xyz = require("./people");

console.log(xyz); //returns the exported object
console.log(xyz.people);
console.log(xyz.num);
//we can also destructure it as const {people , num} = require('./people.js)

//built in modules in node js

const os = require("os"); //operating system
console.log(os); //object with the info about os

console.log("Operating System", os.platform());
console.log("Home Directory", os.homedir());
