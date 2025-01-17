const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) //sorting acc to decending order of created date
    .then(result => {
      //
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
  //
  console.log(req.body); //use of urlencoded , without urlencoded it gives undefined

  const blog = new Blog(req.body);
  blog
    .save()
    .then(result => {
      res.redirect("/blogs");
    })
    .catch(err => console.log(err));
});

//get a single blog
router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Blog.findById(id)
    .then(result => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch(err => console.log(err));
});

//delete blogs
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      //we cannot redirect as a response
      res.json({ redirect: "/blogs" });
    })
    .catch(err => console.log(err));
});

module.exports = router;
