// backend/middlewares/authMiddleware.js
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
    console.log("process.env.jwt_expire:", process.env.JWT_EXPIRES_IN);
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

/*exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Accès refusé' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      // Token valide
      req.utilisateur = decoded;
      return next();
    }

    if (err.name === 'TokenExpiredError') {
      // Token expiré → check refresh token
      const refreshToken = req.cookies?.refreshToken || req.headers['x-refresh-token'];
      if (!refreshToken) {
        return res.status(403).json({ error: 'Token expiré, reconnectez-vous' });
      }

      jwt.verify(refreshToken, process.env.REFRESH_SECRET, (refreshErr, refreshDecoded) => {
        if (refreshErr) {
          return res.status(403).json({ error: 'Refresh token invalide' });
        }

        // Générer un nouveau access token
        const newAccessToken = jwt.sign(
          { id: refreshDecoded.id, email: refreshDecoded.email },
          process.env.JWT_SECRET,
          { expiresIn: '30s' } // pour tester rapidement
        );

        // Mettre le token dans le header pour le front
        res.setHeader('x-access-token', newAccessToken);

        // Continuer la requête
        req.utilisateur = { id: refreshDecoded.id, email: refreshDecoded.email };
        next();
      });
    } else {
      return res.status(403).json({ error: 'Token invalide' });
    }
  });
};*/

