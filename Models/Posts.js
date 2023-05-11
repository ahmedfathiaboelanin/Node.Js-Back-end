const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  userId: {
    type: String,
    // required: true,
  },
  id: {
    type: Number,
    // required: true,
  },
  title: {
    type: String,
    // required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: ()=> Date.now(),
  },
  likes: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
    default: "Anonymous"
  }
});
const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;