const model = require("../Models/Users");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const joi = require("joi");
const Secret = process.env.secret;

// get all Users
const getUsers = async (req, res) => {
    const data = await model.find();
    res.json(data);
};
// getUser By Id
const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await model.findOne({_id:id},'name');
    if (user) {
        return res.send(user)
    } else {
        return res.send("User not found")
    }

}
// add User
const addUser = async (req, res) => {
    const user = req.body;
    const userExist = await model.findOne({ username: user.username });
    if (!userExist) {
        const schema = joi.object({
            username: joi.string().required().min(6).max(50),
            password: joi.string().min(8).max(50)
        })
        const validate = schema.validate(user);
        
        if (validate.error) {
            res.json({ message: validate.error.details[0].message });
        } else {
            const hash = bcrypt.hashSync(user.password,10);
            const newUser = new model({
                username : user.username,
                password : hash
            });
            await newUser.save();
            res.send("User added 👌")
        }
        
    } else {
        res.json({message:"User already exists"});
    }
};
// get specific user
const auth = async (req, res) => {
    const { username, password } = req.body;
    const user = await model.findOne({ username: username });
    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.json({message:"serverError"})
            }
            if (result) {
                const token = jwt.sign({ user:user }, Secret);
                res.json({ token:token,id:user._id,user:user });
            } else {
                return res.json({message:"username or password invalid"})
            }
        });
    } else {
        return res.json({message:"username or password invalid"})
    }
}
// update user
const update = async (req, res) => {
    const reqUser = req.user.user;
    const isExist = await model.findOne({ _id: reqUser._id });
    
    if (isExist) {
        if (req.body) {
                let hash="";
            if (req.body.password) {
                hash = bcrypt.hashSync(req.body.password,10);
            }
            await model.updateOne({ _id: isExist._id },
                {
                    name: req.body.name || isExist.name,
                    email: req.body.email || isExist.email,
                    password: hash || isExist.password,
                    username: req.body.username || isExist.username,
                    phone:req.body.phone || isExist.phone
                })
            res.json({message:"updated"})
        } else {
            res.json({message:"nothing to be updated"})
        }
    } else {
        res.json({message:"user not found"})
    }
}


module.exports.getUserById = getUserById;
module.exports.update = update;
module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.auth = auth;