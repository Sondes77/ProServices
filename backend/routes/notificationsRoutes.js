// backend/routes/notificationsRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationContoller');
const verifyToken = require('../middlewares/authMiddleware'); // 🔐

router.get('/notifications', notificationController.getMesNotifications);
router.patch('/notifications/read/:id', verifyToken.verifyToken, notificationController.markRead);
router.patch('/notifications/read-all', verifyToken.verifyToken, notificationController.markAllRead);
router.patch('/notifications/notified', verifyToken.verifyToken, notificationController.markNotified);
router.delete('/notifications/:id', verifyToken.verifyToken, notificationController.deleteNotification);

module.exports = router;