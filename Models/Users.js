const mongoose = require('mongoose');
const users = new mongoose.Schema({
  name: { type: String, default: "User" },
  phone: { type: String, default: "+201234567890" },
  gender: { type: String, default: "male" },
  birthday: {
    type: Date,
    default: "2001-01-01",
  },
  age: { type: Number, default: 18 },
  email: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, require: true },
});

const userModel = mongoose.model("users", users);
module.exports = userModel;