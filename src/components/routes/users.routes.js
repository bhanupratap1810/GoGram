const express = require('express');

const controller = require('../controller/users.controller');
const analyticsController = require('../controller/analytics.controller')

const router = express.Router();

router.get('/me', controller.findUser);
router.patch('/', controller.updateUser);
router.get('/analytics', analyticsController.analytics);

module.exports = router;