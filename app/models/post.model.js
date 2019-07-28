const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    content: String,
    upVote: count = 0,
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);