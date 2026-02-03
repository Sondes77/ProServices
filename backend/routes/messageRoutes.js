// backend/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageContoller = require('../controllers/messageContoller');
const verifyToken = require('../middlewares/authMiddleware'); // 🔐

// Routes Messages
router.get('/conversations/:id', verifyToken.verifyToken, messageContoller.getConversations);
router.post('/message', verifyToken.verifyToken, messageContoller.sendMessage);
router.post('/messagecontainer', verifyToken.verifyToken, messageContoller.sendMessageContainer);
router.get('/messages/:id', messageContoller.getMessages);

module.exports = router;
