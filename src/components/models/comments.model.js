const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Posts',
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Comments", commentsSchema);