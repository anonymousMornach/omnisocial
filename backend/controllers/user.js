const User = require('../schema/User');
const { hashPassword } = require('../middleware/auth');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
}

// Get user by username
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
}
// Get user by username private
exports.getUserByIdPrivate = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.user });
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
}

// Update user
exports.updateUser = async (req, res) => {
    try {
        const updateFields = {};

        if (req.body.name) {
            updateFields.name = req.body.name;
        }
        if (req.body.username) {
            updateFields.username = req.body.username;
        }

        if (req.body.profilePicture) {
            updateFields.profilePicture = req.body.profilePicture;
        }

        if (req.body.email) {
            updateFields.email = req.body.email;
        }

        if (req.body.age) {
            updateFields.age = parseInt(req.body.age);
        }

        if (req.body.maritalStatus) {
            updateFields.maritalStatus = req.body.maritalStatus;
        }
        const updatedUser = await User.findOneAndUpdate(
            { username: req.user.user }, // Use username as the identifier
            { $set: updateFields },
            { new: true } // To return the updated user
        );

        console.log(updatedUser)
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err });
    }
}


// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const removedUser = await User.findOneAndDelete({ username: req.params.username }); // Use username as the identifier
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
}



