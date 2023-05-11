const jwt = require("jsonwebtoken");

require("dotenv").config();
const Secret = process.env.secret;

const checkAuthorize = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
        jwt.verify(token, Secret, (err, data) => {
            if (err) {
                res.json({ message: err });
            } else {
                req.user = data;
                next();
            }
        });
    } else {
        res.json({ message: "not authorized" });
    }
};
module.exports.checkAuthorize = checkAuthorize; 