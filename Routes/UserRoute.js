const userRoute = require('express').Router();
const { getUsers, addUser, auth,update,getUserById } = require("../Controllers/userContollers.js");
const {checkAuthorize} = require("../MiddleWares/userMiddleWare.js")
userRoute.route("/").get(getUsers);

userRoute.route("/getUserById/:id").get(getUserById);

userRoute.route("/add").post(addUser);

userRoute.route("/login").post(auth);

userRoute.route("/update").put(checkAuthorize,update)

module.exports = userRoute;