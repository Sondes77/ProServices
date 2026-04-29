// Fichier : serviceController.js
// backend/controllers/serviceController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const { te } = require('intl-tel-input/i18n');

require('dotenv').config();

console.log(process.env.GOOGLE_CLIENT_ID);

// Créer un service via le formulaire 
/*exports.creerService = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ message: 'Token manquant' });
    
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token invalide' });
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
    
        const { title, description, category, metier, price, status, duration, gallery, included, notIncluded } = req.body;
        const date_creation = new Date(); // Date actuelle

        const query = `
            INSERT INTO services (professionnel_id, titre, description, categorie, metier, prix, statut, availability, gallery, included, notIncluded, date_creation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
    
          const values = [userId, title, description, category, metier, price, status, duration, JSON.stringify(gallery), JSON.stringify(included), JSON.stringify(notIncluded), date_creation];
    
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
  };*/

exports.creerService = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token invalide' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { title, description, category, metier, price, status, duration, gallery, included, notIncluded } = req.body;
    const date_creation = new Date();

    // ✅ 1️⃣ Vérifier si un service existe déjà pour ce métier
    const checkQuery = `
      SELECT id FROM services 
      WHERE professionnel_id = ? 
      AND metier = ? 
      LIMIT 1
    `;

    db.query(checkQuery, [userId, metier], (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Erreur lors de la vérification :', checkErr);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      
      if (checkResults.length > 0) {
        return res.status(200).json({
          success: false,
          message: "Vous avez déjà un service pour ce métier."
        });
      }

      // 🔹 Vérifier même titre
      const checkTitre = `
        SELECT id FROM services 
        WHERE professionnel_id = ? 
        AND titre = ? 
        LIMIT 1
      `;

      db.query(checkTitre, [userId, title], (errTitre, resultTitre) => {
        if (errTitre) {
          console.error('Erreur vérification titre :', errTitre);
          return res.status(500).json({ message: 'Erreur serveur' });
        }

        if (resultTitre.length > 0) {
          return res.status(200).json({
            success: false,
            message: "Vous avez déjà utilisé ce titre. Le titre doit être unique."
          });
        }  
        // ✅ 2️⃣ Si aucun service trouvé → insertion
        const insertQuery = `
          INSERT INTO services 
          (professionnel_id, titre, description, categorie, metier, prix, statut, availability, gallery, included, notIncluded, date_creation) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
          userId,
          title,
          description,
          category,
          metier,
          price,
          status,
          duration,
          JSON.stringify(gallery),
          JSON.stringify(included),
          JSON.stringify(notIncluded),
          date_creation
        ];

        db.query(insertQuery, values, (err, results) => {
          if (err) {
            console.error('Erreur lors de la création :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
          }

          res.status(200).json({
            success:true,
            userId: userId,
            message: 'Service créé avec succès'
          });
        });
      });
    });
  } catch (error) {
    console.error('Erreur lors de la création du service:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

exports.creerServiceByAdmin = async (req, res) => {
  try {
  
    const userId = req.body.userId;;

    const { title, description, category, metier, price, status, duration, gallery, included, notIncluded } = req.body;
    const date_creation = new Date();

    // ✅ 1️⃣ Vérifier si un service existe déjà pour ce métier
    const checkQuery = `
      SELECT id FROM services 
      WHERE professionnel_id = ? 
      AND metier = ? 
      LIMIT 1
    `;

    db.query(checkQuery, [userId, metier], (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Erreur lors de la vérification :', checkErr);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      
      if (checkResults.length > 0) {
        return res.status(200).json({
          success: false,
          message: "Vous avez déjà un service pour ce métier."
        });
      }

      // 🔹 Vérifier même titre
      const checkTitre = `
        SELECT id FROM services 
        WHERE professionnel_id = ? 
        AND titre = ? 
        LIMIT 1
      `;

      db.query(checkTitre, [userId, title], (errTitre, resultTitre) => {
        if (errTitre) {
          console.error('Erreur vérification titre :', errTitre);
          return res.status(500).json({ message: 'Erreur serveur' });
        }

        if (resultTitre.length > 0) {
          return res.status(200).json({
            success: false,
            message: "Vous avez déjà utilisé ce titre. Le titre doit être unique."
          });
        }  
        // ✅ 2️⃣ Si aucun service trouvé → insertion
        const insertQuery = `
          INSERT INTO services 
          (professionnel_id, titre, description, categorie, metier, prix, statut, availability, gallery, included, notIncluded, date_creation) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
          userId,
          title,
          description,
          category,
          metier,
          price,
          status,
          duration,
          JSON.stringify(gallery),
          JSON.stringify(included),
          JSON.stringify(notIncluded),
          date_creation
        ];

        db.query(insertQuery, values, (err, results) => {
          if (err) {
            console.error('Erreur lors de la création :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
          }

          res.status(200).json({
            success:true,
            userId: userId,
            message: 'Service créé avec succès'
          });
        });
      });
    });
  } catch (error) {
    console.error('Erreur lors de la création du service:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

exports.updateService = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token invalide' });

    const serviceId = req.params.id;

    const { title, description, category, metier, price, status, duration, gallery, included, notIncluded} = req.body;

    const query = `UPDATE services SET titre = ?, description = ?, categorie = ?, metier = ?, prix = ?, statut = ?, availability = ?, gallery = ?, included = ?, notIncluded = ?, date_modification = ? WHERE id = ?`;

      const values = [title, description, category, metier, price, status, duration, JSON.stringify(gallery), JSON.stringify(included), JSON.stringify(notIncluded), new Date(), serviceId];

      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Erreur lors de la mise à jour :', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }
        
        res.status(200).json({ success: true, message: 'Service mis à jour avec succès' });
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
    console.log("ID du service à supprimer:", serviceId);
    console.log("ID de l'utilisateur connecté:", userId);
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

exports.deleteServiceBySuperAdmin = async (req, res) => {
  try {
    const userId = req.body.userId; // ID du user ciblé envoyé dans le body de la requête
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
  //db.query('SELECT * FROM utilisateurs, services where utilisateurs.id = services.professionnel_id and services.statut = "active"', (err, result) => {
  db.query('SELECT u.id AS professional_id, u.nom, u.prenom, u.ville, u.region, u.photo, u.availability, u.apropos, s.id AS service_id, s.titre, s.description, s.categorie, s.metier, s.availability AS service_availability, s.prix, s.sponsored, s.verified, COUNT(r.id) AS review, IFNULL(ROUND(AVG(r.rating),1), 0) AS rating FROM utilisateurs u JOIN services s ON u.id = s.professionnel_id LEFT JOIN reviews r ON u.id = r.recipient_id WHERE s.statut = ? GROUP BY u.id, s.id', ["active"], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des services:', err);
      return res.status(500).send('Erreur serveur');
    }
    res.status(200).json(result);
  });
};

// Récupérer tous les utilisateurs
exports.getMesServices = (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token invalide' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  db.query('SELECT * FROM services where professionnel_id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des services:', err);
      return res.status(500).send('Erreur serveur');
    }
    res.status(200).json(result);
  });
};

// Récupérer tous les utilisateurs
exports.getServicesById = (req, res) => {
  // authHeader = req.headers['authorization'];
  const { id } = req.params;
  /*if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token invalide' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(id);*/
  db.query('SELECT s.*, COUNT(r.id) AS review, IFNULL(ROUND(AVG(r.rating),1), 0) AS rating FROM services s left join reviews r on r.recipient_id = s.professionnel_id where s.id = ? and s.statut = "active"', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des services:', err);
      return res.status(500).send('Erreur serveur');
    }
    console.log(result.length);
    res.status(200).json(result);
  });
};

// Récupérer tous les utilisateurs
exports.getServicesByProId = (req, res) => {
  //const authHeader = req.headers['authorization'];
  const { id } = req.params;
  //if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  //const token = authHeader.split(' ')[1];
  //if (!token) return res.status(401).json({ message: 'Token invalide' });

  //const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //console.log("dfdf",id);
  db.query('SELECT * FROM services where professionnel_id = ? and statut = "active"', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des services:', err);
      return res.status(500).send('Erreur serveur');
    }
    console.log(result.length);
    res.status(200).json(result);
  });
};