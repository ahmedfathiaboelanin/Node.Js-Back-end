const model = require("../Models/Comments");

// get all comments
const getAllComments = async (req, res) => {
    const comments = await model.find();
    res.json(comments)
}
// get comments for specific post
const getPostComment = async (req, res) => {
    const pId = req.params.pId;
    const comments = await model.find({ postId: pId }).populate("uId").sort({_id:-1});
    return res.json(comments)
}
// add Comment 
const addComment = async (req, res) => {
    const newComment = await new model(req.body)
    newComment.save();
}
// delete comment
const deleteComment = async (req, res) => { 
    const cId = req.params.cId;
    const comment = await model.findOneAndDelete({ _id: cId });
    return res.json(comment)
}
module.exports.getAllComments=getAllComments;
module.exports.getPostComment=getPostComment;
module.exports.addComment=addComment;
module.exports.deleteComment=deleteComment;