const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path")
require("dotenv").config();
// connect to db
const uri = process.env.dbUri;
const port = process.env.port;
mongoose.connect(uri, { useNewUrlParser: true });
// user Route
const userRoute = require("./Routes/UserRoute");
// friend route
const friendsRoute = require("./Routes/FriendsRouts")
// post route
const PostsRoutes = require("./Routes/PostsRoutes");
// comment Route
const commentRoute = require("./Routes/CommentRoute");
//  Middleware
app.use(express.json());
app.use(cors());

// app.use(express.static("../clint/build"))
// app.use("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname,"../clint","build","index.html"))
// })
app.use("/Users", userRoute);
app.use("/Friends", friendsRoute);
app.use("/Posts", PostsRoutes);
app.use("/Comments", commentRoute);
// Listen to the Server
app.listen(port, () => {
    console.log('Server is running successfully');
});