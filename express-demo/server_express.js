//express -> framework to make routing simpler
// we can do everyting using node , we use express to make our code simpler

const express = require("express");

const app = express();

//listening to request
app.listen(8080);

app.get("/", (req, res) => {
  //res.send(); //automatically sets the header and status code
  //   res.send("<p>Home Page </p>");
  res.sendFile("./views/index.html", { root: __dirname });
});

//absolute path -> systems path
//relative path -> inside particular folder

app.get("/about", (req, res) => {
  //res.send(); //automatically sets the header and status code
  //   res.send("<p>Home Page </p>");
  res.sendFile("./views/about.html", { root: __dirname });
});


//redirect in express
app.get("/about-us", (req, res) => {
  res.redirect("/about"); //also automatically sets the server code
});

//express will read the code from top to bottom and if no match is found then it will go to the use middleware and fire the event
// if it matches with any request it stops checking
// if we keep it above the page below it will not be matched , it is like a catch block and hence has to be in the end
//404 page
// use ->  for middleware
app.use((req, res) => {
  //here we have to manually write the status code
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
