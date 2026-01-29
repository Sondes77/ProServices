const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken  = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifier que le header commence par "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Token manquant ou invalide:', authHeader); // Affiche l'erreur de décodage
    return res.status(401).json({ error: 'Accès refusé' });
  }

  const token = authHeader.split(' ')[1];

  // Vérifier la validité du token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log("Token décodé:", decoded); // Affiche le token décodé
    //console.log("process.env.JWT_SECRET:", process.env.JWT_SECRET); // Affiche l'erreur de décodage
    if (err) {
      console.log('Erreur de décodage du token:', err); // Affiche l'erreur de décodage
      return res.status(403).json({ error: 'Token invalide ou expiré' });
    }

    // On peut maintenant accéder aux infos dans les routes protégées via req.utilisateur
    req.utilisateur = decoded;
    next(); // On continue vers la route protégée
  });
};
