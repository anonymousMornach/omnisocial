const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    video: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }],
})

module.exports = mongoose.model('Post', postSchema);