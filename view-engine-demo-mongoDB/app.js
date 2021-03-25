const express = require("express");
const mongoose = require("mongoose");
const app = express();
const blogRoutes = require("./routes/blogRoutes");

const morgan = require("morgan"); //3rd party middleware

//Connect to mongo DB
const dbURI =
  "mongodb+srv://First-user:firstuser1234@cluster0.r2y3r.mongodb.net/net-ninja-nodejs?retryWrites=true&w=majority";

//mongoose.connect(dbURI); //gives a warning
//if collection does not exists it will be created

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

app.use(express.urlencoded({ extended: true })); //takes url encoded data and passes into an object that we can use on req object

app.use(morgan("tiny")); //takes a parameter which states how its gonna be formatted

//blog routes
app.use("/blogs", blogRoutes);

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

//mongoose and mongo routes

/*

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "Db blog 2 ",
    snippet: "About my new blog",
    body: "more about my blog",
  });

  //inserting into DB
  blog
    .save()
    .then(result => {
      res.send(result); //JSON response
    })
    .catch(err => {
      console.log(err);
    });
});

//to retrieve all the blogs
app.get("/all-blogs", (req, res) => {
  //we do not need to create another instance we can access it directly on Blog (model)

  Blog.find()
    .then(result => {
      res.send(result);
      // res.write(result);
      // res.end();
    })
    .catch(err => {
      console.log(err);
    });
});

//find a single blog
app.get("/single-blog", (req, res) => {
  //id in mongo is not stored as a string
  //but when we use it in mongoose it is handled as a string

  Blog.findById("605ad42533407e3fbe77affa")
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

//find by id (try)
app.get("/byid/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});


*/

app.get("/", (req, res) => {
  //we dont send file here , we now render a view
  //   res.render("index");

  res.redirect("/blogs");
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
