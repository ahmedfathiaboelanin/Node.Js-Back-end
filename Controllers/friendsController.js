const model = require("../Models/Friends");
// userFriends
const getFriends = async (req, res) => {
    const id = req.params.id;
    const data = await model.find({ user1: id },'user2');
    if (data.length !== 0) {
        return res.json(data);
    } else {
        const friends = await model.find({ user2: id },'user1');
        return res.json(friends);
    }
    // res.send(id)
};
module.exports.getFriends = getFriends;