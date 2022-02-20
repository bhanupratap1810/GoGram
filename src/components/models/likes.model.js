const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Posts',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Likes", likesSchema);