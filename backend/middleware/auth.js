const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

exports.verifyToken = async (req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}