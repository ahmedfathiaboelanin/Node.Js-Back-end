const commentRoute = require("express").Router();
const{getAllComments, getPostComment,addComment, deleteComment} = require("../Controllers/commentController")
const {checkAuthorize} = require("../MiddleWares/userMiddleWare")

commentRoute.route("/").get(getAllComments);

commentRoute.route("/postComment/:pId").get(getPostComment);

commentRoute.route("/addComment").post(checkAuthorize, addComment);

commentRoute.route("/deleteComment/:cId").delete(deleteComment);
module.exports = commentRoute;