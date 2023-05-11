const friendsRoute = require("express").Router();
const {getFriends} = require("../Controllers/friendsController")
friendsRoute.route("/userFriends/:id").get(getFriends);
module.exports = friendsRoute;