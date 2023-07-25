const User = require('../schema/User');

// Send friend request to user
exports.sendFriendRequest = async (req, res) => {
    try {
        const senderUser = await User.findOne({ username: req.user.user });
        const friendUser = await User.findOne({ username: req.params.username });

        if (!senderUser || !friendUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent sending duplicate friend requests
        if (senderUser.friendRequestSent.includes(friendUser._id)) {
            return res.status(400).json({ message: 'Friend request already sent' });
        }

        senderUser.friendRequestSent.push(friendUser._id);
        friendUser.friendRequestReceived.push(senderUser._id);

        await senderUser.save();
        await friendUser.save();

        res.json(senderUser);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Accept friend request
exports.acceptFriendRequest = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const friendUser = await User.findOne({ username: req.body.friendUsername });

        if (!user || !friendUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove friend request after acceptance
        user.friendRequestReceived.pull(friendUser._id);
        friendUser.friendRequestSent.pull(user._id);

        user.friends.push(friendUser._id);
        friendUser.friends.push(user._id);

        await user.save();
        await friendUser.save();

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Remove friend request
exports.removeFriendRequest = async (req, res) => {
    try {
        const senderUser = await User.findOne({ username: req.params.username });
        const friendUser = await User.findOne({ username: req.body.friendUsername });

        if (!senderUser || !friendUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        senderUser.friendRequestSent.pull(friendUser._id);
        friendUser.friendRequestReceived.pull(senderUser._id);

        await senderUser.save();
        await friendUser.save();

        res.json(senderUser);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Remove friend from user
exports.removeFriendFromUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const friendUser = await User.findOne({ username: req.body.friendUsername });

        if (!user || !friendUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.friends.pull(friendUser._id);
        friendUser.friends.pull(user._id);

        await user.save();
        await friendUser.save();

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get friends of user with pagination
exports.getFriendsOfUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).populate('friends');
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const friends = user.friends.slice(startIndex, endIndex);
        res.json(friends);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get friends of user with pagination
exports.getFriendsOfUserPrivate = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.user }).populate({
            path: 'friends',
            select: 'name username profilePicture age email posts',
            populate: { path: 'posts', select: 'content createdAt' } // Populate the posts field for each friend
        });

        const friends = user.friends.map(friend => ({
            name: friend.name,
            username: friend.username,
            profilePicture: friend.profilePicture,
            age: friend.age,
            email: friend.email,
            posts: friend.posts // This will be an array of post objects with content and createdAt fields
        }));

        res.json(friends);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all users other than the user's friends (excluding the user himself)
exports.getAllNonFriendUsers = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.user }).populate('friends', 'username');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const friendsUsernames = user.friends.map(friend => friend.username);

        // Add the user's own username to the friendsUsernames array
        friendsUsernames.push(user.username);

        const nonFriendUsers = await User.find({ username: { $nin: friendsUsernames } });

        // Remove the user himself from the list of non-friend users
        const filteredNonFriendUsers = nonFriendUsers.filter(nonFriend => nonFriend.username !== user.username);

        res.json(filteredNonFriendUsers);
    } catch (err) {
        res.json({ message: err });
    }
}
