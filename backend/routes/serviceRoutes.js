const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceContoller');
const verifyToken = require('../middlewares/authMiddleware'); // 🔐

// Routes Service
router.post('/service', verifyToken.verifyToken, serviceController.creerService);
router.get('/all', serviceController.getServices);
router.get('/mes-services', verifyToken.verifyToken, serviceController.getMesServices);
router.get('/service/:id', serviceController.getServicesById);
router.get('/pro-service/:id', serviceController.getServicesByProId);
router.put('/services/:id', verifyToken.verifyToken, serviceController.updateService);
router.delete('/services/:id', verifyToken.verifyToken, serviceController.deleteService);


module.exports = router;
