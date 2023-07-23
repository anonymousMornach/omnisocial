let mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true, // Ensure usernames are unique
        trim: true // Remove any leading/trailing spaces from the username
    },
    name: String,
    profilePicture: String,
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true, // Ensure emails are unique
        validate: {
            validator: isEmail,
            message: 'Please enter a valid email'
        }
    },
    age: Number,
    maritalStatus: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    friendRequestReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequestSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    token: { type: String },
});

// Path: schema/User.js
module.exports = mongoose.model('User', userSchema);
