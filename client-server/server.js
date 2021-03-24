/* in node we have to create a server 
and listen to it unlike languages like php in which it is managed by tools like apache

this server listens to the requests from the browser and then decides what response is to send to the browser
*/

const http = require("http");
const fs = require("fs");
/*
const server = http.createServer((req, res) => {
  console.log("request recieved");
  console.log("REQUEST OBJECT IS ");
  console.log(req);

  //res headers gives info to the browser about what type of response is comming back
  // eg type of data ie text , html , json etc
  // we can also use it to setcookies
  //set header
  //   res.setHeader("Content-type", "text/plain");
  res.setHeader("Content-type", "text/html");

  res.write("<h1>Visca El Barca</h1>");
  res.write("<h2>Viva Barca</h2>");

  res.end();
});
*/

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/html");

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    //to redirect to another page
    case "/about-me":
      res.statusCode = 301; // 301 means resource moved

      //now to redirect we set Header with Loaction and path
      res.setHeader("Location", "/about");
      res.end();

      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  //reading the html file and sending its data as a response

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else res.write(data);
    res.end();
  });
});

// 1st argument -> port number
// 2nd argument -> host name (by default local host)
// 3rd argument -> function , when we start listening
server.listen(8080, "localhost", () => {
  console.log("Listening for request on port 8080...");
});

// headers -> metadata about the request
