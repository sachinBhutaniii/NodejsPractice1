const express = require("express");

const router = express.Router();
const Post = require("../model/Post");


//get all posts
router.get("/", (req, res) => {
  //   res.send("We are on posts");
  Post.find()
    .then(result => res.send(result))
    .catch(err => console.log(err));
});

router.get("/barca", (req, res) => {
  res.send("We are on Barca post");
});

//submit a post
router.post("/", (req, res) => {
  //   console.log(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  post
    .save()
    .then(data => res.send(data))
    .catch(err => res.status(200).send(err));
});

//get a specific post
router.get("/:id", (req, res) => {
  //   console.log(req.params.id);
  Post.findById(req.params.id)
    .then(result => res.send(result))
    .catch(err => res.status(200).send(err));
});

//delete a specific post
router.delete("/:id", (req, res) => {
  Post.remove({ _id: req.params.id })
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

//update
router.patch("/:id", (req, res) => {
  Post.updateOne({ _id: req.params.id }, { $set: { title: req.body.title } })
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

module.exports = router;
