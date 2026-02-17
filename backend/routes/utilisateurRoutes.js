const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');
const verifyToken = require('../middlewares/authMiddleware'); // 🔐

// Route pour inscription et connection avec Google
router.post('/google', utilisateurController.googleAuth);
router.post('/login', utilisateurController.login);
router.get('/user-location', utilisateurController.getLocation);
router.post('/user-location', utilisateurController.receiveExactLocation);
//router.get('/google', utilisateurController.getGoogleAuth);

router.post('/utilisateur', utilisateurController.creerUtilisateur);
router.get('/utilisateur', verifyToken.verifyToken, utilisateurController.getUtilisateur);
router.get('/utilisateurId', utilisateurController.getUtilisateurId);
router.get('/professional/:id', utilisateurController.getUtilisateurParamId);
router.put('/update-user', verifyToken.verifyToken, utilisateurController.updateUser); 
//router.delete('/utilisateur', verifyToken.verifyToken, utilisateurController.deleteUtilisateur); // Route pour supprimer un utilisateur

// Route pour récupérer tous les utilisateurs
router.get('/utilisateurs', verifyToken.verifyToken, utilisateurController.getUtilisateurs);

//send email code pour vérifier mail & phone
router.post('/send-verification-code', verifyToken.verifyToken, utilisateurController.sendVerificationCode);
router.post('/send-phone-code', verifyToken.verifyToken, utilisateurController.sendPhoneCode);
router.post('/forgot-password', utilisateurController.sendForgotPasswordlink);
router.post('/contact', utilisateurController.contact);
router.get('/reset-password/check/:token', utilisateurController.checkResetToken);
router.post("/reset-password/:token", utilisateurController.resetPassword);
router.put("/change-password", verifyToken.verifyToken, utilisateurController.changePassword);

//vérifier email code pour vérifier mail & phone
router.post('/verify-email-code', verifyToken.verifyToken, utilisateurController.VerifyRmailCode);
router.post('/verify-phone-code', verifyToken.verifyToken, utilisateurController.verifyPhoneCode);

// Routes pour les paramètres de confidentialité
router.get('/privacy', verifyToken.verifyToken, utilisateurController.getMyPrivacy);
router.put('/privacy', verifyToken.verifyToken, utilisateurController.updateMyPrivacy);

module.exports = router;
