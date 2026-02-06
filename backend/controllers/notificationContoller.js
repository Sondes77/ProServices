// Fichier : serviceController.js
// backend/controllers/serviceController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
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

// Récupérer les notifications de l'utilisateur connecté
exports.getMesNotifications = (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("Decoded token:", decoded);

    const userId = decoded.id;

    db.query(
      `SELECT 
        n.id,
        n.user_id,
        n.user_id2,
        n.type,
        n.title,
        n.text,
        n.link,
        n.unread,
        n.created_at,
        u2.photo AS photo,
        u2.role AS user2_role

      FROM notifications n

      -- utilisateur destinataire
      JOIN utilisateurs u ON n.user_id = u.id

      -- utilisateur secondaire (expéditeur / lié)
      LEFT JOIN utilisateurs u2 ON n.user_id2 = u2.id

      WHERE u.id = ?
      ORDER BY n.created_at DESC;`,
      [userId],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Erreur serveur');
        }

        res.status(200).json(result);
      }
    );

  } catch (err) {
    console.log("JWT error:", err.name);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expiré" });
    }

    return res.status(403).json({ message: "Token invalide" });
  }
};

// Marquer les notifications comme lues pour un utilisateur
exports.markRead = (req, res) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token invalide' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { id } = req.params;

  db.query('UPDATE notifications SET unread = FALSE WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de la notification:', err);
      return res.status(500).send('Erreur serveur');
    }
   
    res.status(200).json(result);
  });
};

// Marquer les notifications comme lues pour un utilisateur
exports.markAllRead = (req, res) => {
  const authHeader = req.headers['authorization'];
  const  type  = req.body.type;
  //const fullType = type +"_received";
  console.log("Type received in markAllRead:", type);
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token invalide' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  
  console.log("User ID for markAllRead:", userId);
    if (type === "message_received"){
      db.query('UPDATE notifications SET unread = FALSE WHERE user_id = ? and type = ?', [userId, type], (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour de la notification:', err);
        return res.status(500).send('Erreur serveur');
      }
    
      res.status(200).json(result);
    });
  } else if (type === "notifications"){
    db.query('UPDATE notifications SET unread = FALSE WHERE user_id = ? and type != ?', [userId, "message_received"], (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour de la notification:', err);
        return res.status(500).send('Erreur serveur');
      }
      res.status(200).json(result);
    });
  }
};

// Marquer les notifications comme lues pour un utilisateur
exports.deleteNotification = (req, res) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token invalide' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { id } = req.params;
  
  console.log("User ID for deleteNotification:", decoded.id);
  db.query('DELETE FROM notifications WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la notification:', err);
      return res.status(500).send('Erreur serveur');
    }
   
    res.status(200).json(result);
  });
};