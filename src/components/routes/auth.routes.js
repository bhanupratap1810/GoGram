const router = require("express").Router();
const controller = require("../controller/auth.controller")
const { verifyToken, passwordValidation, registerValidation, loginValidation } = require('../../utilities/middlewares')
const multer = require("multer");
const path = require("path");

// storage engine 
const storage = multer.diskStorage({
    destination: './uploads/profilePic',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage: storage })

// register route
router.route('/register').post(upload.single('image'), registerValidation, controller.register);

// login route
router.route('/login').post(loginValidation, controller.login);

// resetPassword route
router.route('/reset-password').post(verifyToken, passwordValidation, controller.resetPassword);

// forgotPassword route
router.route('/forgot-password').post(passwordValidation, controller.forgotPassword);

// logout route
router.route('/logout').post(verifyToken, controller.logout);

module.exports = router;