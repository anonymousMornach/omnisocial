const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    video: String,
    loves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    location: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }],
    createdAt: { type: Date, default: Date.now } // Add createdAt field
});

module.exports = mongoose.model('Post', postSchema);
