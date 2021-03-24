//file system in node js using fs module

const fs = require("fs");

//reading file

/*
fs.readFile("./textfiles/blog.txt", (err, data) => {
  //callback function
  if (err) {
    console.log(err);
  }
  console.log(data); // returns a buffer
  console.log(data.toString());
});

console.log("Hello"); //executed before file read
*/

// //write file
// fs.writeFile("./textfiles/blog.txt", "New Text Added to the file", () => {
//   console.log("File was written ");
// });

// // while writing a file if file does not exist , a new file will be created
// fs.writeFile("./textfiles/blog2.txt", "New Text Added to the file", () => {
//   console.log("File was written ");
// });

//directories
//creating a folder named assets in current path
/*
fs.mkdir("./assets", err => {
  if (err) console.log(err);

  console.log("Folder created");
});
*/
//we can only create a folder once if we run same code again it will give an error
//hence we should check first that the folder exists or not

//existsSync -> sync method hence blocks the code

/*
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", err => {
    if (err) console.log(err);

    console.log("Folder created");
  });
} else {
  //we are removing the folder here
  fs.rmdir("./assets", err => {
    if (err) console.log(err);

    console.log("Folder Deleted");
  });
}
*/

//deleting a file

/*
if (fs.existsSync("./textfiles/blog2.txt")) {
  //unlink -> to delete
  fs.unlink("./textfiles/blog2.txt", err => {
    if (err) console.log(err);

    console.log("File Deleted");
  });
} else {
  console.log("File Does Not Exist");
}
*/
