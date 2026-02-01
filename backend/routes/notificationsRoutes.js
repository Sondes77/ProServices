const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationContoller');
const verifyToken = require('../middlewares/authMiddleware'); // 🔐

router.get('/notifications', verifyToken.verifyToken, notificationController.getMesNotifications);
router.get('/pro-review/:id', notificationController.getReviewsByProId);
router.post('/review', verifyToken.verifyToken, notificationController.creerReview);

module.exports = router;
