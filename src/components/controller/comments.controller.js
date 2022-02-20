const CommentSchema = require("../models/comments.model")
const Post = require("../models/posts.model")
const User = require("../models/users.model")

exports.comment = async (req, res, next) => {
    try {
        let user = await User.findOne({ _id: req.user.id });
        if (!user) return next(res.status(400).json({ error: "User not found" }));
        let posts = await Post.findById(req.params.id);
        if (!posts) return next(res.status(500).json({ error: "Posts not found" }));
        const commentSchema = new CommentSchema({
            comment: req.body.comment,
            postId: req.params.id,
            authorId: req.user.id
        });
        let savedComment = await commentSchema.save();
        if (!savedComment) return next(res.status(500).json({ error: "Could not like the post!" }));
        return res.status(201).json({ status: "success", error: null, data: { commentSchema: savedComment } });

    } catch (error) {
        return next(error)
    }
};