const jwt = require("jsonwebtoken");
const User = require("../db/models/user.js");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ _id: decoded_token._id, 'tokens.token': token })

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send("Error : Please authenticate !!!");
    }
}
module.exports = auth;