// backend/routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Dossier de stockage
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${uniqueSuffix}${ext}`);
  }
});
const upload = multer({ storage });

// Route POST /api/upload-avatar
// Route POST /api/upload-avatar
router.post('/upload-avatar', upload.single('avatar'), (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token invalide' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  console.log('Fichier reçu:', req.file);

  if (!req.file || !userId) {
    return res.status(400).json({ error: 'Fichier ou userId manquant' });
  }

  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

  db.query(
    'UPDATE utilisateurs SET photo = ? WHERE id = ?',
    [fileUrl, userId],
    (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour :', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      res.status(200).json({userId: userId, avatarUrl: fileUrl, message: 'Avatar mis à jour avec succès' });
    }
  );
});

router.post('/upload-gallery', upload.array('images', 5), (req, res) => {

  const imageUrls = req.files.map(file =>
    `http://localhost:5000/uploads/${file.filename}`
  );

  res.json({
    urls: imageUrls
  });

});

router.post("/upload-message-file", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Aucun fichier" });
  }

  const fileUrl = `/uploads/${req.file.filename}`;

  res.json({
    success: true,
    fileUrl,
    fileName: req.file.originalname,
    type: req.file.mimetype.startsWith("image") ? "image" : "file"
  });
});

module.exports = router;
