// if we are using large files then we use streams to read or write data to or from files

//using streams we can pass or recieve data a bit at a time instead of waiting for whole data
// these small chunks of data are called buffers

const fs = require("fs");

const readStream = fs.createReadStream("./textfiles/largefile.txt", {
  encoding: "utf8",
});

const writeStream = fs.createWriteStream("./textfiles/newfile.txt", {
  encoding: "utf8",
});

// .on is an event listener like onclick
/*
readStream.on("data", chunk => {
  //
  console.log("-----------------New Chunk---------------");
  console.log(chunk);  
  writeStream.write("\n NEW CHUNK \n");
  writeStream.write(chunk);
});
*/

//the above code can be written as below code (using pipes)
//pipe used while passing data from readable to writable stream

//piping
readStream.pipe(writeStream);
//under the hood it does the same thing as above lines of code

//there is also another stream called duplex stream which can be used to read and write through it
