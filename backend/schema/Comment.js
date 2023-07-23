const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: String,
    image: String,
    video: String,
    reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Comment', commentSchema);