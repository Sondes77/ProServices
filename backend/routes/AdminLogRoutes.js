const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminLogController');
const verifyToken = require('../middlewares/authMiddleware'); // 🔐

// Route pour l'authentification admin
router.post('/auth/admin-login', AdminController.login);
router.get('/auth/verify-login', AdminController.verifyLogin);

module.exports = router; 