const mongoose = require("mongoose");
const friends = new mongoose.Schema({
  user1: {
    type: String,
    required: true,
  },
  user2: {
    type: String,
    required: true,
  },
});

const friendsModel = mongoose.model("friends", friends);
module.exports = friendsModel;
