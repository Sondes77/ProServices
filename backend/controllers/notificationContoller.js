// Fichier : serviceController.js
// backend/controllers/serviceController.js
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
//const { te } = require('intl-tel-input/i18n');

require('dotenv').config();

exports.creerReview = async (req, res) => {
  try {
    // 🔐 Auth
    const authHeader = req.headers['authorization'];
    if (!authHeader)
      return res.status(401).json({ message: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    if (!token)
      return res.status(401).json({ message: 'Token invalide' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // 📦 Body
    const { recipientId, content, rating } = req.body;

    if (!recipientId || !content || !rating) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const reviewId = crypto.randomUUID();
    const dateCreation = new Date();

    // 💾 Insert review
    await db.promise().query(
      `INSERT INTO reviews 
       (id, author_id, recipient_id, rating, comment, created_at) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [reviewId, userId, recipientId, rating, content, dateCreation]
    );

    // 👤 Nom auteur
    const [rows] = await db.promise().query(
      `SELECT nom FROM utilisateurs WHERE id = ?`,
      [userId]
    );

    const senderName = rows[0]?.nom || "Un utilisateur";

    // 🔔 Notification destinataire
    await db.promise().query(
      `INSERT INTO notifications
       (user_id, type, title, text, link, is_read, created_at)
       VALUES (?, ?, ?, ?, ?, FALSE, NOW())`,
      [
        recipientId,
        "review_received",
        "Nouvel avis",
        `${senderName} vous a laissé un avis`,
        "/profile#reviews"
      ]
    );

    // ✅ OK
    res.status(200).json({
      message: "Review créée avec succès",
      reviewId
    });

  } catch (error) {
    console.error("Erreur création review:", error);
    res.status(500).json({ message: "Erreur interne serveur" });
  }
};

// Récupérer tous les utilisateurs
exports.getMesNotifications = (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token invalide' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  db.query('SELECT * FROM notifications n JOIN utilisateurs u on n.user_id = u.id where u.id = ? order by n.created_at DESC', [userId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des services:', err);
      return res.status(500).send('Erreur serveur');
    }
  console.log(result);
    res.status(200).json(result);
  });
};

// Récupérer tous les utilisateurs
exports.getReviewsByProId = (req, res) => {
  //const authHeader = req.headers['authorization'];
  const { id } = req.params;
  //if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  //const token = authHeader.split(' ')[1];
  //if (!token) return res.status(401).json({ message: 'Token invalide' });

  //const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //console.log("dfdf",id);
  db.query('SELECT r.id AS review_id, r.rating, r.comment, r.created_at, u.id AS author_id, u.nom AS author_nom, u.photo AS author_photo, ur.id AS recipient_id, ur.nom AS recipient_nom, ur.photo AS recipient_photo FROM reviews r JOIN utilisateurs u ON r.author_id = u.id JOIN utilisateurs ur ON r.recipient_id = ur.id WHERE r.recipient_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des reviews:', err);
      return res.status(500).send('Erreur serveur');
    }
    console.log(result.length);
    res.status(200).json(result);
  });
};