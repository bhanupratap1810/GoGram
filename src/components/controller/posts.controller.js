const Post = require("../models/posts.model")
const User = require("../models/users.model")

exports.createPost = async (req, res, next) => {
    try {
        let user = await User.findOne({ _id: req.user.id });
        if (!user) return next(res.status(400).json({ error: "User not found" }));
        const post = new Post({
            description: req.body.description,
            image: req.file.filename,
            authorId: req.user.id
        });
        let savedPost = await post.save();
        if (!savedPost) return next(res.status(400).json({ error: "Post not saved!" }));
        return res.status(201).json({ status: "success", error: null, data: { post: savedPost } });
    } catch (error) {
        return next(error)
    }
};

exports.queryAllPosts = async (req, res, next) => {
    try {
        let offset = parseInt(req.query.offset ? req.query.offset : 0);
        let count = parseInt(req.query.count ? req.query.count : 0);
        let user = await User.findOne({ _id: req.user.id });
        if (!user) return next(res.status(400).json({ error: "User not found" }));
        let posts = await Post.find().sort('-date').skip(offset).limit(count);
        if (!posts) return next(res.status(500).json({ error: "Posts not found" }));
        let postCount = await Post.find().count();
        if (!postCount) return next(res.status(500).json({ error: "Posts count not found" }));
        return res.status(200).json({
            status: "success",
            totalCount: postCount,
            data: posts
        });
    } catch (error) {
        return next(error)
    }
};

exports.findPosts = async (req, res, next) => {
    try {
        let user = await User.findOne({ _id: req.user.id });
        if (!user) return next(res.status(400).json({ error: "User not found" }));
        let posts = await Post.find({ authorId: req.user.id });
        if (!posts) return next(res.status(500).json({ error: "Posts not found" }));
        return res.status(200).json({
            status: "success",
            data: posts
        });
    } catch (error) {
        return next(error)
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        let user = await User.findOne({ _id: req.user.id });
        if (!user) return next(res.status(400).json({ error: "User not found" }));
        let posts = await Post.findById(req.params.id);
        if (!posts) return next(res.status(500).json({ error: "Posts not found" }));
        if (posts.authorId != req.user.id)
            return next(res.status(400).json({ error: "User not permitted to delete this post" }));
        await Post.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            status: "success",
            data: "Post is deleted"
        });
    } catch (error) {
        return next(error)
    }
};