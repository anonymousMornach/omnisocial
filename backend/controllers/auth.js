//Create the auth controller with the following methods: Register, Login, and Logout
// Path: controllers/auth.js
const User = require('../schema/User');
const { hashPassword, comparePassword } = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
    try {
        const { name, username, email, password} = req.body;
        // Check if username exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Check if email exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });

        //add token
        const savedUser = await newUser.save();
        const token = jwt.sign(
            { user: newUser.username },
            process.env.JWT_TOKEN_KEY,
            { expiresIn: `${process.env.JWT_EXPIRES_IN}` } // Token will expire in 1 hour
        );

        res.json({ token, user: { id: newUser._id, name: newUser.name, username: newUser.username, email: newUser.email } });
    } catch (err) {
        res.json({ message: err });
    }
}

// Login
exports.login = async (req, res) => {
    try {
        const { password } = req.body;
        const email = req.body.email.toLowerCase();
        const username = req.body.email;

        // Check if the user exists
        const user = await User.findOne({ username: username });
        const userEmail = await User.findOne({ email: email });
        if (!user) {
            if(!userEmail){
                return res.status(404).json({ message: 'User not found.' });
            }
        }


        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await comparePassword(password, (user ? user.password : userEmail.password ));
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        // Create a JSON Web Token (JWT) for authentication

        const token = jwt.sign(
            { user: user ? user.username : userEmail.username},
            process.env.JWT_TOKEN_KEY,
            { expiresIn: `${process.env.JWT_EXPIRES_IN}` } // Token will expire in 1 hour
        );

        if (user){
            res.json({ token, user: { id: user.username, name: user.name, username: user.username, email: user.email } });
        }
        else if(userEmail){
            res.json({ token, user: { id: userEmail._id, name: userEmail.name, username:userEmail.username, email: userEmail.email } });
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
}

//CheckAuth
exports.checkAuth = async (req, res) => {
    //Check token
    const tokenGet = req.headers["authorization"]; // Note the lowercase "authorization"

    if (!tokenGet) {
        return res.status(403).send("A token is required for authentication");
    }

    // Split the "Authorization" header to get the token part after "Bearer "
    const token = tokenGet.split(" ")[1];
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
        req.user = decoded;
        const user = await User.findOne({ username: req.user.user });
        if(user){
            res.status(200).send("Valid Token");
        }
        else{
            res.status(401).send("Invalid Token");
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
}