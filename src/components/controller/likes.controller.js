const LikeSchema = require("../models/likes.model")
const Post = require("../models/posts.model")
const User = require("../models/users.model")

exports.like = async (req, res, next) => {
    try {
        let user = await User.findOne({ _id: req.user.id });
        if (!user) return next(res.status(400).json({ error: "User not found" }));
        let posts = await Post.findById(req.params.id);
        if (!posts) return next(res.status(500).json({ error: "Posts not found" }));
        const likeSchema = new LikeSchema({
            postId: req.params.id,
            userId: req.user.id
        });
        let savedLike = await likeSchema.save();
        if (!savedLike) return next(res.status(500).json({ error: "Could not like the post!" }));
        return res.status(201).json({ status: "success", error: null, data: { likeSchema: savedLike } });

    } catch (error) {
        return next(error)
    }
};