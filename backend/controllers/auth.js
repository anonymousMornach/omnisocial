//Create the auth controller with the following methods: Register, Login, and Logout
// Path: controllers/auth.js
const User = require('../schema/User');
const { hashPassword, comparePassword } = require('../middleware/auth');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Function to generate a random token
const generateRandomToken = () => {
    const randomToken = crypto.randomBytes(32).toString('hex');
    return randomToken.substring(0, 5);
};

// Function to send an email with the token
const sendTokenByEmail = async (email, token, name) => {
    try {
        // Replace the following details with your email service settings
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: `${process.env.WEB_SITE_EMAIL}`,
                pass: `${process.env.WEB_SITE_PASSWORD}`,
            },
        });

        const mailOptions = {
            from: `${process.env.WEB_SITE_NAME}`,
            to: email,
            subject: 'Your Verification Code for Omnisocial',

            html: `<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
    <div style="background-color: #007BFF; padding: 20px; border-radius: 10px;">
        <h1 style="color: #ffffff; text-align: center;">Omnisocial</h1>
    </div>
    <div style="background-color: #e7f0fa; padding: 20px; border-radius: 10px; margin-top: 20px;">
        <h2 style="color: #007BFF; text-align: center; margin-bottom: 20px;">Your Verification Code</h2>
        <p style="font-size: 16px; text-align: center;">Hello ${name},</p>
        <p style="font-size: 16px; text-align: center;">Your verification code is: </p>
        <p style="font-weight: bold; font-size: 40px; color: #007BFF;">${token}</p>
        <p style="font-size: 16px; text-align: center;">Thank you!</p>
    </div>
    <div style="background-color: #007BFF; padding: 20px; border-radius: 10px; margin-top: 20px;">
        <p style="font-size: 14px; text-align: center; color: #ffffff;">If you did not request this verification code, please ignore this email.</p>
        <p style="font-size: 14px; text-align: center; color: #ffffff;">For any questions or assistance, please contact support at <a href="mailto:omnisocial@gmail.com" style="color: #ffffff; text-decoration: underline;">omnisocial@gmail.com</a></p>
    </div>
</div>
`,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
};


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

        res.json({ token, newUser});
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
            res.json({ token, user: { id: user.username, name: user.name, username: user.username, email: user.email, approved: user.approved } });
        }
        else if(userEmail){
            res.json({ token, user: { id: userEmail._id, name: userEmail.name, username:userEmail.username, email: userEmail.email, approved: userEmail.approved  } });
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
}

//CheckAuth
exports.checkAuth = async (req, res) => {
    const tokenGet = req.headers["authorization"]; // Note the lowercase "authorization"\
    const user = await User.findOne({username: req.user.user});
    if (!tokenGet) {
        return res.status(403).send("A token is required for authentication");
    }

    // Split the "Authorization" header to get the token part after "Bearer "
    const token = tokenGet.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
        req.user = decoded;
        const user = await User.findOne({username: req.user.user});
        if (user){
            if(!user.approved) {
                res.status(401).send("unverified");
            }else{
                res.status(200).send("verified");
                console.log("verified")
            }
        }
        else{
            res.status(401).send("Invalid Token")
            console.log("3")
        }
    } catch (err) {
        res.status(401).send("Invalid Token");
    }
}

// Add this function in the auth controller to generate and send the token
exports.sendTokenByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.user });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Generate a random token
        const verificationCode = generateRandomToken();

        // Update the user's token field in the database
        user.verificationCode = verificationCode;
        await user.save();

        // Send the token to the user's email
        await sendTokenByEmail(user.email, verificationCode, user.name);

        res.status(200).json({ message: 'Token sent successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};


// Function to compare user input with stored token
exports.compareToken = async (req, res) => {
    try {
        const { verificationCode } = req.body;

        // Check if the email exists in the database
        const user = await User.findOne({username: req.user.user});
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the provided token with the stored token
        if (user.verificationCode === verificationCode) {
            user.approved = true;
            await user.save();
            res.status(200).json({ message: 'Token is valid.' });
        } else {
            res.status(401).json({ message: 'Invalid token.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};
