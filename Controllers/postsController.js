const model = require("../Models/Posts");

// get all Posts
const getPosts = async (req, res) => {
    const data = await model.find().sort({ _id: -1 });
    res.json(data);
};
// get Post by id
const getPostById = async (req, res) => {
    const id = req.params.id;
    const post = await model.findById(id);
    if (post) {
        return res.json(post)
    }else{
        return res.json({message : "Post not Found"})
    }
}
// add Post
const addPost = async (req, res) => {
    const data = req.body;
    const newPost = new model(data);
    await newPost.save();
};
// get User Post
const getUserPosts = async (req, res) => {
    const userId = req.user.user._id;
    const posts = await model.find({ userId: userId }).sort({_id:-1});
    res.json(posts)
}
// delete Posts
const deletePost = async (req, res) => {
    const id = req.params.id;
    await model.deleteOne({_id:id})
    res.send("deleted")
}
// update Posts
const updatePost = async (req, res) => {
    const id = req.params.id;
    const post = await model.findById(id)
    if (post) {
        await model.updateOne(post, { $inc: { likes: 1 } })
        res.send("updated")
    } else {
        res.send("post is not found")
    }
}
module.exports.getPosts = getPosts;
module.exports.getPostById = getPostById;
module.exports.addPost = addPost;
module.exports.getUserPosts = getUserPosts;
module.exports.deletePost = deletePost;
module.exports.updatePost = updatePost;
