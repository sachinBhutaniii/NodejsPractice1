//using lodash

const _ = require("lodash");
const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/html");
  res.write("<h1>WELCOME</h1>");

  //lodash

  const num = _.random(0, 20);
  console.log(num);

  //it also has a mthod called once which will run a method only once
  const greet = _.once(() => {
    console.log("Hello");
  });

  greet();
  greet(); // will not be called here
  res.end();
});

server.listen(8080, "localhost", () => {
  console.log("Listening for request on port 8080...");
});
