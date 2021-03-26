const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv/config");

const postRoutes = require("./routes/posts");

app.use(cors());
app.use(bodyParser.json());
app.use("/posts", postRoutes);
//connecting to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Conencted to DB....")
);

app.listen(8080);
