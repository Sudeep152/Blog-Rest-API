const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    username: {
      require: true,
      type: String,
    },

    title: {
      require: true,
      unique: true,
      type: String,
    },

    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostSchema);
