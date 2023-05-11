const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
    uId: { type: String, required: true, ref: "users" },
    postId: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, default: ()=> Date.now() }
})
const commentModel = mongoose.model("comments", commentSchema);
module.exports = commentModel;