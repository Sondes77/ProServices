// Fichier : serviceController.js
// backend/controllers/serviceController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
//const { te } = require('intl-tel-input/i18n');

require('dotenv').config();

console.log(process.env.GOOGLE_CLIENT_ID);

// Créer un service via le formulaire 
exports.creerService = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ message: 'Token manquant' });
    
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token invalide' });
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
    
        const { title, description, category, price, status} = req.body;
        const date_creation = new Date(); // Date actuelle

        const query = `
            INSERT INTO reviews (professionnel_id, titre, description, categorie, prix, statut, date_creation) VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
    
          const values = [userId, title, description, category, price, status, date_creation];
    
          db.query(query, values, (err, results) => {
            if (err) {
              console.error('Erreur lors de la création :', err);
              return res.status(500).json({ message: 'Erreur serveur' });
            }
            
            res.status(200).json({ 
              userId: userId,
              message: 'Service créé avec succès' 
            });
          });
    
    } catch (error) {
    console.error('Erreur lors de la création du sevice:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

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
       (user_id, user_id2, type, title, text, link, unread, created_at)
       VALUES (?, ?, ?, ?, ?, ?, true, NOW())`,
      [
        recipientId,
        userId,
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

exports.updateService = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token invalide' });

    const serviceId = req.params.id;

    const { title, description, category, price, status} = req.body;

    const query = `UPDATE services SET titre = ?, description = ?, categorie = ?, prix = ?, statut = ? WHERE id = ?`;

      const values = [title, description, category, price, status, serviceId];

      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Erreur lors de la mise à jour :', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }
        res.status(200).json({ message: 'Service mis à jour avec succès' });
      });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du Service:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};
  
exports.deleteService = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token invalide' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const serviceId = req.params.id;

    // On supprime le service uniquement s’il appartient au user connecté (sécurité)
    const query = `DELETE FROM services WHERE id = ? AND professionnel_id = ?`;

    const values = [serviceId, userId];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Erreur lors de la supression :', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      
      res.status(200).json({ message: 'Service supprimé avec succès' });
    });

  } catch (error) {
    console.error('Erreur lors de la supression du Service:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Récupérer un utilisateur par son mail
exports.getUtilisateur = (req, res) => {
  const { email } = req.query;

  // Vérification de la présence de l'email dans la requête
  if (!email) {
    console.log('Email manquant dans la requête');
    return res.status(400).send('Email requis');
  }

  console.log('Email récupéré depuis la query:', email);
  db.query('SELECT * FROM utilisateurs WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', err);
      return res.status(500).send('Erreur serveur');
    }
    if (result.length === 0) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    res.status(200).json(result[0]);
  });
};

// Récupérer tous les utilisateurs
exports.getServices = (req, res) => {
  db.query('SELECT * FROM utilisateurs, services where utilisateurs.id = services.professionnel_id and services.statut = "active"', (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des services:', err);
      return res.status(500).send('Erreur serveur');
    }
    res.status(200).json(result);
  });
};

// Récupérer tous les utilisateurs
exports.getMesReviews = (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token invalide' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  db.query('SELECT r.id AS review_id, r.rating, r.comment, r.created_at, u.id AS author_id, u.nom AS author_nom, u.photo AS author_photo, ur.id AS recipient_id, ur.nom AS recipient_nom, ur.photo AS recipient_photo FROM reviews r JOIN utilisateurs u ON r.author_id = u.id JOIN utilisateurs ur ON r.recipient_id = ur.id WHERE r.recipient_id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des services:', err);
      return res.status(500).send('Erreur serveur');
    }
  console.log(result);
    res.status(200).json(result);
  });
};

// Récupérer tous les utilisateurs
exports.getServicesById = (req, res) => {
  const authHeader = req.headers['authorization'];
  const { id } = req.params;
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token invalide' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(id);
  db.query('SELECT * FROM services where id = ? and statut = "active"', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des services:', err);
      return res.status(500).send('Erreur serveur');
    }
    console.log(result.length);
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