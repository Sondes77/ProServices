// backend/routes/notificationsRoutes.js
const express = require('express');
const router = express.Router();
const devisController = require('../controllers/devisContoller');
const verifyToken = require('../middlewares/authMiddleware'); // 🔐


router.post("/devis", verifyToken.verifyToken, devisController.createDevis);
router.get("/devis/pro", verifyToken.verifyToken, devisController.getDemandesForPro);
router.put("/devis/:id/propose", verifyToken.verifyToken, devisController.proposeDevis);
router.get("/devis/me", verifyToken.verifyToken, devisController.getMyDevis);
router.put("/devis/:id/accepted", verifyToken.verifyToken, devisController.acceptDevis);
router.put("/devis/:id/rejected", verifyToken.verifyToken, devisController.rejectDevis);

module.exports = router;