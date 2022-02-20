const User = require("../models/users.model")
const startOfDay = require('date-fns/startOfDay')

exports.analytics = async (req, res, next) => {
    try {
        let user = await User.findOne({ _id: req.user.id }, { password: 0 });
        if (!user) return next(res.status(400).json({ error: "User not found" }));
        let postsCount = await User.aggregate([
            {
                $lookup: {
                    as: "posts",
                    foreignField: "authorId",
                    from: "posts",
                    localField: "_id"
                }
            },
            {
                $match: {
                    email: user.email,
                    "posts.date": { "$gte": startOfDay(new Date()) },
                }
            },
            { $unwind: "$posts" },
            {
                $count: "posts"
            }
        ]);
        if (postsCount.length == 0) return next(res.status(400).json({ error: "Error in counting posts" }));

        let likesCount = await User.aggregate([
            {
                $lookup: {
                    as: "likes",
                    foreignField: "userId",
                    from: "likes",
                    localField: "_id"
                }
            },
            { $unwind: "$likes" },
            {
                $match: {
                    email: user.email,
                    "likes.date": { "$gte": startOfDay(new Date()) },
                }
            },
            {
                $count: "likes"
            }
        ]);
        if (likesCount.length == 0) return next(res.status(400).json({ error: "Error in counting likes" }));

        let commentsCount = await User.aggregate([
            {
                $lookup: {
                    as: "comments",
                    foreignField: "authorId",
                    from: "comments",
                    localField: "_id"
                }
            },
            { $unwind: "$comments" },
            {
                $match: {
                    email: user.email,
                    "comments.date": { "$gte": startOfDay(new Date()) },
                }
            },
            {
                $count: "comments"
            }
        ]);
        if (commentsCount.length == 0) return next(res.status(400).json({ error: "Error in counting comments" }));

        return res.status(200).json({
            status: "success",
            data: {
                userId: user.id,
                userName: user.name,
                posts: postsCount[0].posts,
                likes: likesCount[0].likes,
                comments: commentsCount[0].comments
            }
        });
    } catch (error) {
        return next(error)
    }
};