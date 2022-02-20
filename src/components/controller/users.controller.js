const User = require("../models/users.model")

exports.findUser = async (req, res, next) => {
    try {
        let user = await User.findOne({ _id: req.user.id }, { password: 0 });
        if (!user) return next(res.status(400).json({ error: "User not found" }));
        return res.status(200).json({
            status: "success",
            data: user
        });
    } catch (error) {
        return next(error)
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        let user = await User.findOne({ _id: req.user.id });
        if (!user) return next(res.status(400).json({ error: "User not found" }));
        if (req.body.password || req.body.email)
            return next(res.status(400).json({ error: "Some of fields are not editable" }));
        await User.updateOne({ _id: req.user.id }, req.body);
        return res.status(200).json({
            status: "success",
            data: "Successfully updated user data"
        });
    } catch (error) {
        return next(error)
    }
};