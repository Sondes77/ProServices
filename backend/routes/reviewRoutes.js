const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewContoller');
const verifyToken = require('../middlewares/authMiddleware'); // 🔐

// Routes Service
//.post('/service', verifyToken.verifyToken, reviewController.creerService);
//router.get('/all', reviewController.getReviews);
router.get('/mes-reviews', verifyToken.verifyToken, reviewController.getMesReviews);
//router.get('/service/:id', verifyToken.verifyToken, reviewController.getServicesById);
router.get('/pro-review/:id', reviewController.getReviewsByProId);
//router.put('/services/:id', verifyToken.verifyToken, reviewController.updateService);
//router.delete('/services/:id', verifyToken.verifyToken, reviewController.deleteService);


module.exports = router;
