const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/users.model");

exports.register = async (req, res, next) => {
    try {
        const isEmailExist = await User.findOne({ email: req.body.email });

        // throw error when email already registered
        if (isEmailExist) return next(res.status(400).json({ error: "Email already exists" }));

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password,
            profilePic: {
                address: req.file.filename,
                contentType: 'image/png'
            }
        });

        let savedUser = await user.save();
        if (!savedUser) return next(res.status(500).json({ error: "User not registered!" }));
        return res.status(201).json({ status: "success", error: null, data: { userId: savedUser._id } });

    } catch (error) {
        return next(error)
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        // throw error when email is wrong
        if (!user) return next(res.status(400).json({ error: "Email is wrong" }));

        // check for password correctness
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return next(res.status(400).json({ error: "Password is wrong" }));

        // create token
        const token = jwt.sign(
            // payload data
            {
                name: user.name,
                id: user._id,
            },
            process.env.TOKEN_SECRET
        );

        return res.status(200).header("auth-token", token).json({
            status: "success",
            error: null,
            data: {
                token,
            },
        });
    }
    catch (error) {
        return next(error)
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        // throw error if user does not exist
        if (!user) return next(res.status(400).json({ error: "User does not exist" }));

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(req.body.password, salt);

        await User.findByIdAndUpdate(req.user.id, { password: hashedPwd });
        return res.status(200).json({
            status: "success",
            data: "Password changed successfully"
        });
    }
    catch (error) {
        return next(error)
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const isEmailExist = await User.findOne({ email: req.body.email });

        // throw error when email already registered
        if (!isEmailExist) return next(res.status(400).json({ error: "Email is wrong!" }));

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(req.body.password, salt);

        await User.findOneAndUpdate(
            { email: req.body.email },
            { password: hashedPwd });
        return res.status(200).json({
            status: "success",
            data: "Password changed successfully"
        });
    }
    catch (error) {
        return next(error)
    }
};

exports.logout = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        // throw error if user does not exist
        if (!user) return next(res.status(400).json({ error: "User does not exist" }));
        return res.status(200).json({
            status: "success",
            data: "logged out successfully"
        });
    }
    catch (error) {
        return next(error)
    }
};