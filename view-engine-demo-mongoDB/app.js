const express = require("express");
const mongoose = require("mongoose");
const app = express();

const morgan = require("morgan"); //3rd party middleware

//Connect to mongo DB
const dbURI =
  "mongodb+srv://First-user:firstuser1234@cluster0.r2y3r.mongodb.net/net-ninja-nodejs?retryWrites=true&w=majority";

//mongoose.connect(dbURI); //gives a warning
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log("Connected To DB....");
    app.listen(8080); //listen to req only when connection is established with DB
  })
  .catch(err => console.log(err));

//using view engine for dynamic data
// there are many options we can choose from but we are choosing ejs here

//using ejs as our view engine and registering it
app.set("view engine", "ejs");
//automatically express and ejs will look into views folder
// if you want to set it manually ie diff folder

//app.set("views", "myfolderforviews");

app.use(morgan("tiny")); //takes a parameter which states how its gonna be formatted

//MIDDLEWARE
// it will be called for every request from top to bottom all middlewares are called until a response is sent
// to tell middleware to pass control  , we have to write next() else it will keep the browser hanging
/*
app.use((req, res, next) => {
  console.log("New Request was made ");
  console.log("HOst", req.hostname);
  console.log("Path", req.path);
  console.log("method", req.method);
  next();
});



app.use((req, res, next) => {
  console.log("in the next middleware");
  next();
});
*/

app.get("/", (req, res) => {
  //we dont send file here , we now render a view
  //   res.render("index");

  const blogs = [
    { title: "PSG", snippet: "Neymar 123456789" },
    { title: "Barca", snippet: "Messi 123456789" },
    { title: "Athletico", snippet: "Suarez 123456789" },
  ];
  //passing some dynamic value
  res.render("index", { title: "Home", blogs });
});

//this middleware will not be called for / request becasue we are sending response before it
app.use((req, res, next) => {
  console.log("in the next middleware AGAIN");
  next();
});

app.get("/about", (req, res) => {
  //we dont send file here , we now render a view
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

app.use((req, res) => {
  //we dont send file here , we now render a view
  res.status(404).render("404", { title: "404" });
});

/*

    SERVER SIDE RENDERING 
    Our view files live on the server and when we want to render one to the browser that view file is passed into the view engine to be processed ,
    the engine looks for dynamic content , like varibale , loops , comditions etc if it founds any it creates the html for that part 
    and in the end it gives the updated version of html page based on our template and then the html page will be returned to the browser 

*/

// if files has something in common we can create a file with with that common parts it is called PARTIALS

//using a 3rd party middleware called morgan
