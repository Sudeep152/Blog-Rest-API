const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");

app.use(express.json());

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {})
  .then(console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });

app.get("", (req, res) => {
  res.send(
    "Api is working \n getRequest for post => https://blogrestapi152.herokuapp.com/api/post "
  );
});
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

module.exports = app;
