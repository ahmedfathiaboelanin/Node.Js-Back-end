// create Router using Express
const PostsRoutes = require("express").Router();

// import controllers
const { getPosts, addPost, getUserPosts,deletePost,updatePost,getPostById} = require("../Controllers/postsController");

const {checkAuthorize} =  require ("../MiddleWares/userMiddleWare.js")

// get all Posts
PostsRoutes.route("/").get(getPosts);

// add Post
PostsRoutes.route("/add").post(addPost);

// getUserPosts
PostsRoutes.route("/getUserPosts").get(checkAuthorize, getUserPosts);

// Delete Post
PostsRoutes.route("/deletePost/:id").delete(checkAuthorize,deletePost);

PostsRoutes.route("/getPostById/:id").get(getPostById);

// updatePost
PostsRoutes.route("/updatePost/:id").put(updatePost);
module.exports = PostsRoutes;
