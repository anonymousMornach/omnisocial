const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    type: String,
    comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
})

module.exports = mongoose.model('Reaction', reactionSchema);