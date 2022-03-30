const route = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const { MongoServerError } = require("mongodb");

const saltRounds = 10;

route.post("/register", async (req, res) => {
  try {
    const slat = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, slat);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      status: "something went wrong",
    });
    console.log(err);
  }
});

route.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credential");

    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validatePassword && res.status(400).json("Wrong credential");

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {}
});

module.exports = route;
