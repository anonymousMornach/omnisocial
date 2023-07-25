const Post = require("../schema/Post");
const User = require("../schema/User");

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('user', 'name username profilePicture'); // Populate the 'user' field with 'name' and 'username'
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
}

// Get posts by user
exports.getPostsByUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 }).populate('user', 'name username'); // Populate the 'user' field with 'name' and 'username'
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
}

// Add post
exports.addPost = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.user });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const post = new Post({
            title: req.body.title,
            body: req.body.body,
            user: user._id,
            image: req.body.image,
            video: req.body.video,
        });

        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
}

// Delete post
exports.deletePosts = async (req, res) => {
    try {
        const removedPost = await Post.findOneAndDelete({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
}

// Update post
exports.updatePosts = async (req, res) => {
    try {
        const updatedPost = await Post.findOneAndUpdate(
            { _id: req.params.postId },
            {
                $set: {
                    title: req.body.title,
                    body: req.body.body,
                    image: req.body.image,
                    video: req.body.video,
                }
            },
            { new: true } // To return the updated post
        ).populate('user', 'name username'); // Populate the 'user' field with 'name' and 'username'

        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
}
