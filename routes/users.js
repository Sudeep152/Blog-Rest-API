const route = require("express").Router();
const User = require("../model/User");

route.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log("Something went wrong");
    res.status(404).json({
      status: "not found check your id",
    });
  }
});

route.get("", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({
      status: "Something went wrong",
    });
  }
});

module.exports = route;
