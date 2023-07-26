const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schema/User');


//Hashing the password
exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

//Compare the password
exports.comparePassword = async (password, hashedPassword) => {
    const validPassword = await bcrypt.compare(password, hashedPassword);
    return validPassword;
}

exports.verifyToken = async (req, res, next) => {
    const tokenGet = req.headers["authorization"]; // Note the lowercase "authorization"

    if (!tokenGet) {
        return res.status(403).send("A token is required for authentication");
    }

    // Split the "Authorization" header to get the token part after "Bearer "
    const token = tokenGet.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
        req.user = decoded;
        const user = await User.findOne({username: req.user.user});
        if (user){
            if(!user.approved){
                return res.status(401).send("unverified");
            }
        }
        else{
            res.status(401).send("Invalid Token")
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
};

exports.verifyTokenSafe = async (req, res, next) => {
    const tokenGet = req.headers["authorization"]; // Note the lowercase "authorization"

    if (!tokenGet) {
        return res.status(403).send("A token is required for authentication");
    }

    // Split the "Authorization" header to get the token part after "Bearer "
    const token = tokenGet.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
        req.user = decoded;
        const user = await User.findOne({username: req.user.user});
        if (!user){
            return res.status(401).send("Invalid Token");
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
};