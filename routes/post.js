const route = require("express").Router();
const Post = require("../model/Post");
const User = require("../model/User");

route.post("/create", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      const newpost = new Post({
        username: req.body.username,
        title: req.body.title,
        desc: req.body.desc,
      });
      const post = await newpost.save();

      res.status(200).json(post);
    } else {
      res.status(400).json({
        status: "Invalid User",
      });
    }
  } catch (err) {
    res.json({
      status: err,
    });
  }
});

route.get("", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: posts,
    });
  } catch (err) {}
});

route.delete("/:title", async (req, res) => {
  try {
    const title = await Post.findOne({ title: req.params.title });
    if (title) {
      const deletePost = await Post.deleteOne({ title: req.params.title });
      res.status(200).json({
        status: "Post Deleted Successfully",
      });
    } else {
      res.status(404).json({
        status: "Invalid Post Title",
      });
    }
  } catch (err) {}
});

module.exports = route;
