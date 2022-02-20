const express = require('express');
const multer = require("multer");
const path = require("path");
const likeController = require('../controller/likes.controller');
const commentsController = require('../controller/comments.controller');

const controller = require('../controller/posts.controller');

const router = express.Router();

// storage engine 
const storage = multer.diskStorage({
    destination: './uploads/postsImages',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage: storage })

// post routes
router.post('/', upload.single('image'), controller.createPost)
router.get('/', controller.queryAllPosts)
router.get('/me', controller.findPosts);
router.delete('/:id', controller.deletePost);

// like posts
router.post('/:id/like', likeController.like);

// post comments
router.post('/:id/comment', commentsController.comment);

module.exports = router;