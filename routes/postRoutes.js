const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

// Test route
router.get("/", (req, res) => {
  res.send("hello");
});

// Add post
router.post("/add", isAuth, isAdmin, async (req, res) => {
  try {
    const { title, body, image } = req.body;

    const newPost = new Post({
      title,
      body,
      image,
    });

    const post = await newPost.save();

    res.send({ msg: "Post added", post });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Delete post
router.delete("/delete/:_id", isAuth, isAdmin, async (req, res) => {
  try {
    const { _id } = req.params;
    const post = await Post.findByIdAndRemove(_id);

    if (!post) {
      return res.status(404).send({ msg: "Post not found" });
    }

    res.send({ msg: "Post deleted", post });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Edit post
router.put("/edit/:_id", isAuth, isAdmin, async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).send({ msg: "Post not found" });
    }

    res.send({ msg: "Post edited", post: updatedPost });
  } catch (error) {
    console.error("Error editing post:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Fetch all posts
router.get("/getall", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send({ msg: "Posts fetched", posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = router;


