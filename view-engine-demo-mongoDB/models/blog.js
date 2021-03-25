const mongoose = require("mongoose");
const Schema = mongoose.Schema; // defines the structure of documents that we will store inside a collection

//schema is a part of mongoose not mongodb

const blogSchema = new Schema(
  {
    //here we pass an object , this object will describe the structure of the document that we want to store in our blogs collection
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//we can also pass a 2nd argument to schema i.e of timestamp

//model
// whatever value we pass here , the DB will convert it to prural i.e Blogs ,
// whereever we use blog DB will convert it to Blogs
// based on this name it will automatically look for the blogs collection
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
