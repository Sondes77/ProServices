// Fichier : utilisateurController.js
// backend/controllers/utilisateurController.js
const db = require('../config/db');
const { OAuth2Client } = require('google-auth-library');
const { findOrCreateUser } = require('../models/utilisateurModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const { te } = require('intl-tel-input/i18n');
const crypto = require("crypto");
const nodemailer = require("nodemailer");

require('dotenv').config();

// Récupérer l'adresse IP de l'utilisateur et sa localisation
exports.getLocation = async (req, res) => {
  const userIp = req.headers['x-forwarded-for'];
  console.log("IP reçue dans l'en-tête :", userIp);

  if (!userIp) return res.status(400).json({ message: "IP manquante" });

  try {
    const response = await fetch(`https://ipinfo.io?token=e67698084c27f5`);
    const data = await response.json();

    const { city, region, country } = data;
    console.log(`Localisation data :`, data);
    console.log(`Localisation : ${city}, ${region}, ${country}`);
    res.json({ city, region, country });
  } catch (error) {
    console.error("Erreur IP info :", error);
    res.status(500).json({ message: "Erreur lors de la récupération de la localisation" });
  }
};

exports.receiveExactLocation = (req, res) => {
  const { latitude, longitude } = req.body;
  console.log("Position utilisateur :", latitude, longitude);
  res.json({ message: "Localisation enregistrée avec succès" });
};

// Créer un utilisateur via le formulaire d'inscription
exports.creerUtilisateur = async (req, res) => {
    const { nom, prenom, email, tel, category, password, role} = req.body;
    //let role = req.body.role; // Récupérer le rôle depuis le corps de la requête
    const date_creation = new Date(); // Date actuelle
    const hashedPassword = await bcrypt.hash(password, 10); // 🔐
    const source = 'formulaire'; // Source de l'inscription
    const email_verified = false;
    const photo = "http://localhost:5000/uploads/ServicePro_Avatar.png"; // Avatar par défaut
    console.log("je suis role dans exports.creerUtilisateur = ", role);

    try{
        db.query(
        'INSERT INTO utilisateurs (nom, prenom, email, role, phone, source, category, mot_de_passe, date_creation, photo, email_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nom, prenom, email, role, tel, source, category, hashedPassword, date_creation, photo, email_verified],
        (err, result) => {
          if (err) {
            console.error('Erreur lors de la création de l\'utilisateur:', err);
            return res.status(500).send('Erreur serveur');
          }
          if (role === 'professional') {
            db.query('Insert into settings set user_id = ?', [result.insertId], (err2, rows) => {
              if (err2) {
                console.error('Erreur lors de la création des paramètres:', err2);
                return res.status(500).send('Erreur serveur');
              }
            });
          }
            const token = jwt.sign(
              { id: result.insertId, email },
              process.env.JWT_SECRET,
              { expiresIn: '1h' }
            );
           
            return res.status(201).json({
              message: "Utilisateur créé avec succès",
              token,
              id: result.insertId
            });
            
        }
      );
    } catch (err) {
      console.log(err.code);
      // ✅ email déjà utilisé
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          message: "Cet email est déjà utilisé"
        });
      }
      else { // ✅ autre erreur serveur
      return res.status(500).json({
        message: "Erreur lors de l'inscription"
      });}
    }
};

// mettre à jour un utilisateur
// Mettre à jour un utilisateur via PersonalInfo.tsx
exports.updateUser = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token invalide' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { firstName, lastName, email, phone, city, region, address, apropos} = req.body;

    const query = `
        UPDATE utilisateurs 
        SET nom = ?, prenom = ?, email = ?, phone = ?, ville = ?, region = ?, adresse = ?, apropos = ?, date_modification = NOW()
        WHERE id = ?
      `;

      const values = [firstName, lastName, email, phone, city, region, address, apropos, userId];

      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Erreur lors de la mise à jour :', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }
        
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
      });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Login un utilisateur
// Login un utilisateur avec mot de passe
//un endpoint de connexion POST /api/login
exports.login = (req, res) => {
    const { email, password } = req.body;
  
    db.query(`SELECT u.*, 
      COUNT(DISTINCT s.id) AS nb_services, 
      COUNT(DISTINCT r.id) AS nb_reviews, 
      COUNT(DISTINCT c.id) AS nb_conversations 
      FROM utilisateurs u 
      LEFT JOIN services s ON s.professionnel_id = u.id and s.statut = ? 
      LEFT JOIN reviews r ON r.recipient_id = u.id 
      LEFT JOIN conversations c ON c.user1_id = u.id or c.user2_id = u.id WHERE u.email = ? 
      GROUP BY u.id;`, ['active', email], async (err, result) => {
        
      if (err) return res.status(500).json({ error: "Erreur serveur" });
  
      const user = result[0];
      if (!user) return res.status(401).json({ error: "Utilisateur introuvable" });
  
      const match = await bcrypt.compare(password, user.mot_de_passe);
      console.log("Mot de passe vérifié:", match); // Affiche le résultat de la comparaison
      console.log("Mot de passe utilisateur:", user.mot_de_passe); // Affiche le mot de passe hashé
      console.log("Mot de passe fourni:", password); // Affiche le mot de passe fourni
      if (!match) return res.status(401).json({ error: "Mot de passe incorrect" });
  
      // ✅ Génère un token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      /*const refreshToken = jwt.sign({ id: user.id, email }, process.env.REFRESH_SECRET, { expiresIn: '1h' });

        // Cookie httpOnly pour le refresh
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 3600 * 1000 });*/

      // ✅ Retourne le token et l'utilisateur
      res.json({ token, user });
    });
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
  db.query(`SELECT u.id, u.nom, u.prenom, u.email, u.role, u.email_verified, u.phone, u.ville, u.region, u.category, u.metier, u.adresse, u.apropos, u.photo, u.date_creation,
    COUNT(DISTINCT s.id) AS nb_services, 
    COUNT(DISTINCT r.id) AS nb_reviews, 
    COUNT(DISTINCT c.id) AS nb_conversations
    FROM utilisateurs u 
    LEFT JOIN services s ON s.professionnel_id = u.id and s.statut = ? 
    LEFT JOIN reviews r ON r.recipient_id = u.id 
    LEFT JOIN conversations c ON c.user1_id = u.id or c.user2_id = u.id 
    WHERE u.email = ? 
    GROUP BY u.id`, ['active', email], (err, result) => {

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

// Récupérer un utilisateur par son mail
exports.getUtilisateurId = (req, res) => {
  const { id } = req.query;

  // Vérification de la présence de l'email dans la requête
  if (!id) {
    console.log('Id manquant dans la requête');
    return res.status(400).send('Email requis');
  }

  console.log('Email récupéré depuis la query:', id);
  db.query('SELECT u.*, COUNT(DISTINCT s.id) AS nb_services, COUNT(DISTINCT r.id) AS nb_reviews, COUNT(DISTINCT c.id) AS nb_conversations FROM utilisateurs u LEFT JOIN services s ON s.professionnel_id = u.id and s.statut = ? LEFT JOIN reviews r ON r.recipient_id = u.id LEFT JOIN conversations c ON c.user1_id = u.id or c.user2_id = u.id WHERE u.id = ? GROUP BY u.id', ['active', id], (err, result) => {
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
exports.getUtilisateurParamId = (req, res) => {
  //const authHeader = req.headers['authorization'];
  const { id } = req.params;
  //if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  //const token = authHeader.split(' ')[1];
  //if (!token) return res.status(401).json({ message: 'Token invalide' });

  //const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //console.log(id);
  db.query(`SELECT
              u.id,
              u.prenom,
              u.nom,
              u.role,
              u.email,
              u.email_verified,
              u.phone_verified,
              u.phone,
              u.ville,
              u.region,
              u.adresse,
              u.apropos,
              u.photo,
              u.date_creation,

              se.show_phone,
              se.show_address,
              se.allow_share,
              se.statut_profil,
              se.email_notifications,

              COUNT(DISTINCT s.id) AS nb_services,
              COUNT(DISTINCT r.id) AS nb_reviews,
              COUNT(DISTINCT c.id) AS nb_conversations

            FROM utilisateurs u

            LEFT JOIN services s
              ON s.professionnel_id = u.id
              AND s.statut = ?

            LEFT JOIN reviews r
              ON r.recipient_id = u.id

            LEFT JOIN conversations c
              ON (c.user1_id = u.id OR c.user2_id = u.id)

            LEFT JOIN settings se
              ON se.user_id = u.id

            WHERE u.id = ?

            GROUP BY
              u.id,
              u.prenom,
              u.nom,
              u.role,
              u.email,
              u.email_verified,
              u.phone_verified,
              u.phone,
              u.ville,
              u.region,
              u.adresse,
              u.apropos,
              u.photo,
              u.date_creation,
              se.show_phone,
              se.show_address,
              se.allow_share,
              se.statut_profil,
              se.email_notifications`, ['active', id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des services:', err);
      return res.status(500).send('Erreur serveur');
    }
    //console.log(result.length);
    res.status(200).json(result);
  });
};
// Récupérer tous les utilisateurs
exports.getUtilisateurs = (req, res) => {
  db.query('SELECT * FROM utilisateurs', (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
      return res.status(500).send('Erreur serveur');
    }
    res.status(200).json(result);
  });
};

// login avec Google et MySQL
exports.googleAuth = async (req, res) => {
    const { credential, role } = req.body;
    console.log("Token reçu:", credential);
    console.log("Rôle reçu:", role); // Affiche le rôle reçu

    // Vérifie que la clé `credential` est bien présente
    if (!credential) {
        return res.status(400).json({ error: "Token Google manquant" });
    }

    try {
      console.log("GOOGLE_CLIENT_ID = "+ process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      
      console.log(ticket);
  
      const payload = ticket.getPayload();
  
      findOrCreateUser({...payload, role}, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
  
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        /*const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_SECRET, { expiresIn: '1h' });

        // Cookie httpOnly pour le refresh
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 3600 * 1000 });*/

        //console.log("Token généré:", token); // Affiche le token généré
        //console.log("Utilisateur récupéré:", user); // Affiche l'utilisateur récupéré
        res.json({ token, user });
        //res.redirect(`http://localhost:3000/dashboard?name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`);
      });
  
    } catch (error) {
      res.status(401).json({ error: "Token invalide" });
    }
  };
  
// Récupérer les messages
exports.getMessages = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM messages ORDER BY created_at ASC');
    res.json(rows);
  } catch (err) {
    console.error('Erreur GET /api/messages :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.creerMessage = async (req, res) => {
  try {
    const { content, sender } = req.body;
    const [result] = await db.query(
      'INSERT INTO messages (content, sender) VALUES (?, ?)',
      [content, sender]
    );
    const [message] = await db.query('SELECT * FROM messages WHERE id = ?', [result.insertId]);
    res.json(message[0]);
  } catch (err) {
    console.error('Erreur POST /api/messages :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ⬅️ Envoyer un code à l'utilisateur pour Email
exports.sendVerificationCode = (req, res) => {

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email manquant" });
  const code = Math.floor(100000 + Math.random() * 900000); // Code 6 chiffres

  try{
    // Stocker le code dans la base
     db.query(
      "UPDATE utilisateurs SET email_code = ? WHERE email = ?",
      [code, email]
    );

    const transporter = nodemailer.createTransport({
      //host: "ssl0.ovh.net",
      host: "smtp.mail.ovh.net",
      port: 465,
      secure: true,
      auth: {
        user: "contact@servicepro.tn",
        pass: "ServicePro610.P###",
      },
    });
    
    console.log(transporter.verify());
    transporter.verify((error, success) => {
      if (error) {
        console.log("❌ Erreur SMTP :", error);
      } else {
        console.log("✅ SMTP prêt à envoyer");
      }
    });

     transporter.sendMail({
      from: `"SERVICEPRO" <contact@servicepro.tn>`,
      to: email,
      subject: "Votre code de confirmation",
      text: `Votre code de vérification est : ${code}`,
      html: `<p>Votre code de vérification est : <b>${code}</b></p>`,
    });

    return res.json({ success: true, message: "Code envoyé" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// Vérification mail
exports.VerifyRmailCode = (req, res) => {
  try {
    const { email, code } = req.body;

    db.query(
      "SELECT email_code FROM utilisateurs WHERE email = ?",
      [email],
      (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erreur serveur SQL" });
        }

        if (!rows || rows.length === 0) {
          return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        if (rows[0].email_code !== code) {
          return res.status(400).json({ message: "Code incorrect" });
        }

        db.query(
          "UPDATE utilisateurs SET email_verified = 1, email_code = NULL WHERE email = ?",
          [email],
          (err2) => {
            if (err2) {
              console.error(err2);
              return res.status(500).json({ message: "Erreur serveur SQL" });
            }

            return res.json({ success: true });
          }
        );
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// ⬅️ Envoyer un lien à l'utilisateur pour réinitialiser le mot de passe
exports.sendForgotPasswordlink = (req, res) => {
  try {
    const { email } = req.body;
    console.log("Email reçu pour réinitialisation :", email);
    if (!email)
      return res.status(400).json({ message: "Email manquant" });

    // 1️⃣ Vérifier si l'utilisateur existe
    db.query(
      "SELECT id FROM utilisateurs WHERE email = ?",
      [email],
      (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erreur serveur SQL" });
        }

        if (!rows || rows.length === 0) {
          return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

     const user = rows[0];

    // 2️⃣ Générer un token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // 3️⃣ Hasher le token
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // 4️⃣ Expiration (15 min)
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    // 5️⃣ Sauvegarder en DB
    db.query(
      `UPDATE utilisateurs
       SET reset_password_token = ?, reset_password_expires = ?
       WHERE id = ?`,
      [hashedToken, expires, user.id]
    );

    // 6️⃣ Lien frontend
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    console.log("Lien de réinitialisation :", resetLink);
    
     const transporter = nodemailer.createTransport({
      //host: "ssl0.ovh.net",
      host: "smtp.mail.ovh.net",
      port: 465,
      secure: true,
      auth: {
        user: "contact@servicepro.tn",
        pass: "ServicePro610.P###",
      },
    });
    
    console.log(transporter.verify());
    transporter.verify((error, success) => {
      if (error) {
        console.log("❌ Erreur SMTP :", error);
      } else {
        console.log("✅ SMTP prêt à envoyer");
      }
    });

     transporter.sendMail({
      from: `"SERVICEPRO" <contact@servicepro.tn>`,
      to: email,
      subject: "Réinitialisation de mot de passe",
     //text: `Votre code de vérification est : ${code}`,
      html: `
          <!DOCTYPE html>
          <html>
            <body style="font-family: Arial, sans-serif;">
              <p>Vous avez demandé une réinitialisation de mot de passe.</p>

              <p>
                <a 
                  href="${resetLink}"
                  style="
                    display:inline-block;
                    padding:12px 20px;
                    background:#e0692d;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:6px;
                    font-weight:bold;
                  "
                  target="_blank"
                >
                  Cliquez ici pour réinitialiser votre mot de passe
                </a>
              </p>

              <p style="font-size:12px;color:#666;">
                Ce lien expire dans 15 minutes.
              </p>

              <p style="font-size:12px;">
                Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br/>
                <a href="${resetLink}"
                  style="color:#e0692d; word-break:break-all; text-decoration:none;">
                  ${resetLink}
                </a>
              </p>
            </body>
          </html>`,
    });

    res.json({ message: "Lien de réinitialisation envoyé" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.checkResetToken = (req, res) => {
  const { token } = req.params;

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")
  console.log("hashedToken = ", hashedToken);

  db.query(
    "SELECT reset_password_expires FROM utilisateurs WHERE reset_password_token=?",
    [hashedToken],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Erreur serveur" });

      if (!rows[0]) {
        return res.status(404).json({ status: "not_found" });
      }

      const now = Date.now();
      const expires = new Date(rows[0].reset_password_expires).getTime();

      if (expires < now) {
        return res.json({ status: "expired" });
      }

      return res.json({ status: "valid" });
    }
  );
};

// ⬅️ Réinitialiser le mot de passe avec le token
exports.resetPassword = async (req, res) => {
  try{
    const { token } = req.params;
    const { password } = req.body;
    console.log("Token reçu pour réinitialisation :", req.params);
    if (!password)
      return res.status(400).json({ message: "Mot de passe requis" });

    // 1️⃣ Hasher le token reçu
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // 2️⃣ Vérifier token + expiration
    db.query(
      `SELECT id FROM utilisateurs
      WHERE reset_password_token = ?
      AND reset_password_expires > NOW()`,
      [hashedToken],
      
      (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erreur serveur SQL" });
        }

        if (!rows || rows.length === 0) {
          return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        const user = rows[0];
        console.log("Utilisateur pour réinitialisation :", user);
        // 3️⃣ Hasher le nouveau mot de passe
        // HASH du mot de passe avec callback
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) return res.status(500).json({ error: "Erreur hashing" });
          console.log("Nouveau mot de passe hashé :", hashedPassword);

        // 4️⃣ Mettre à jour + nettoyer le token
          db.query(
            `UPDATE utilisateurs
            SET mot_de_passe = ?, reset_password_token = NULL, reset_password_expires = NULL
            WHERE id = ?`,
            [hashedPassword, user.id]
          );
          res.json({ message: "Mot de passe réinitialisé avec succès" });
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ⬅️ Changer le mot de passe (utilisateur connecté)
exports.changePassword =  (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
   
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });
  
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token invalide' });
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const { currentPassword, newPassword } = req.body;

    db.query(
      "SELECT mot_de_passe FROM utilisateurs WHERE id=?",
      [userId],
      (err, rows) => {
        if (err) return res.status(500).json({ error: "Erreur serveur" });
        if (!rows[0]) return res.status(404).json({ success: false, message: "Utilisateur introuvable" });

        const ok = bcrypt.compareSync(currentPassword, rows[0].mot_de_passe);
        if (!ok) return res.status(400).json({ success: false, message: "Mot de passe actuel incorrect" });

        const hash = bcrypt.hashSync(newPassword, 10);
        
        db.query(
          "UPDATE utilisateurs SET mot_de_passe=? WHERE id=?",
          [hash, userId],
          (err2) => {
            if (err2) return res.status(500).json({ success: false, message: "Erreur serveur" });
            res.json({ success: true, message: "Mot de passe mis à jour avec succès" });
          }
        );
      }
    );

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ⬅️ Envoyer un code à l'utilisateur pour Phone
exports.sendPhoneCode = (req, res) => {
  try {
    const userId = req.body.id;
    console.log("userId =", userId);

    db.query(
      "SELECT phone FROM utilisateurs WHERE id = ?",
      [userId],
      (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erreur base de données" });
        }

        if (!rows.length) return res.status(404).json({ message: "Utilisateur introuvable" });

        const phone = rows[0].telephone;
        const code = Math.floor(100000 + Math.random() * 900000);

        // Sauvegarde le code dans la base
        db.query(
          "UPDATE utilisateurs SET phone_code = ? WHERE id = ?",
          [code, userId],
          (err2) => {
            if (err2) {
              console.error(err2);
              return res.status(500).json({ message: "Erreur base de données" });
            }

            // Génère le lien WhatsApp prérempli
            const whatsappLink = `https://wa.me/${phone}?text=Votre%20code%20de%20vérification%20est%20:%20${code}`;

            return res.json({ success: true, whatsappLink });
          }
        );
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Vérification Phone
exports.verifyPhoneCode = (req, res) => {
  try {
    const userId = req.user.id;
    const { code } = req.body;

    const [rows] = db.query(
      "SELECT phone_code FROM utilisateurs WHERE id = ?",
      [userId]
    );

    if (!rows.length) return res.status(404).json({ message: "User non trouvé" });

    if (rows[0].phone_code !== code) {
      return res.status(400).json({ message: "Code incorrect" });
    }

    db.query(
      "UPDATE utilisateurs SET phone_verified = 1, phone_code = NULL WHERE id = ?",
      [userId]
    );

    return res.json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET PRIVACY SETTINGS
exports.getMyPrivacy = (req, res) => {
  try {
    const userId = req["utilisateur"].id;
    db.query(
      "SELECT * FROM settings WHERE user_id=?",
      [userId],
      (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erreur base de données" });
        }
        if (!rows.length) return res.status(404).json({ message: "User non trouvé" });
        console.log("Paramètres de confidentialité récupérés :", rows[0]);
        res.json(rows[0]);
      }
    );
   
    //res.json(rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur récupération paramètres" });
  }
};

// UPDATE PRIVACY SETTINGS
exports.updateMyPrivacy = (req, res) => {
  try {
    const userId = req["utilisateur"].id;
    console.log("userId pour updateMyPrivacy =", req.body);
    const {
      show_phone,
      show_address,
      allow_share,
      statut_profil,
      email_notifications
    } = req.body;

    db.query(`
      UPDATE settings
      SET show_phone=?,
          show_address=?,
          allow_share=?,
          statut_profil=?,
          email_notifications=?
      WHERE user_id=?
    `, [
      show_phone,
      show_address,
      allow_share,
      statut_profil,
      email_notifications,
      userId
    ]);

    res.json({ ok: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur mise à jour paramètres" });
  }
};

exports.contact = (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
      
    const transporter = nodemailer.createTransport({
      //host: "ssl0.ovh.net",
      host: "smtp.mail.ovh.net",
      port: 465,
      secure: true,
      auth: {
        user: "contact@servicepro.tn",
        pass: "ServicePro610.P###",
      },
    });
    
    console.log(transporter.verify());
    transporter.verify((error, success) => {
      if (error) {
        console.log("❌ Erreur SMTP :", error);
      } else {
        console.log("✅ SMTP prêt à envoyer");
      }
    });

    transporter.sendMail({
      from: `"SERVICEPRO" <contact@servicepro.tn>`,
      to: "contact@servicepro.tn",
      replyTo: email,
      subject: `[Contact Site] ${subject}`,
     //text: `Votre code de vérification est : ${code}`,
      html: `
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="UTF-8">
          <title>Nouveau message contact</title>
          </head>
          <body style="margin:0;font-family:Arial,sans-serif;background:#f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <table width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background:#e0692d;padding:24px;color:white;text-align:center;">
                        <h2>Nouveau message — Formulaire Contact</h2>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td style="padding:30px;">
                        <p><b>Nom :</b> ${name}</p>
                        <p><b>Email :</b> ${email}</p>
                        <p><b>Sujet :</b> ${subject}</p>

                        <div style="margin-top:20px;padding:20px;background:#fafafa;border-radius:8px;">
                          ${message}
                        </div>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background:#f0f0f0;padding:20px;text-align:center;font-size:12px;color:#777;">
                        Message envoyé depuis le site web
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>`,
    });
    transporter.sendMail({
      from: `"SERVICEPRO" <contact@servicepro.tn>`,
      to: email,
      subject: `Accusé de reception`,
     //text: `Votre code de vérification est : ${code}`,
      html: `
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="UTF-8">
          </head>
          <body style="margin:0;font-family:Arial;background:#f6f7f9;">
            <table width="100%">
              <tr>
                <td align="center">
                  <table width="600" style="background:white;border-radius:12px;">
                    
                    <tr>
                      <td style="background:#e0692d;color:white;padding:28px;text-align:center;">
                        <h2>Message bien reçu</h2>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:30px;">
                        <p>Bonjour ${name},</p>

                        <p>Nous avons bien reçu votre message.</p>
                        <p>Notre équipe vous répondra rapidement.</p>

                        <table width="100%" style="margin-top:20px;background:#fafafa;padding:16px;border-radius:8px;">
                          <tr><td><b>Sujet :</b> ${subject}</td></tr>
                          <tr><td>${message}</td></tr>
                        </table>

                        <div style="margin-top:30px;text-align:center;">
                          <a href="{{site_url}}" style="
                            background:#e0692d;
                            color:white;
                            padding:14px 22px;
                            border-radius:8px;
                            text-decoration:none;
                            display:inline-block;
                          ">
                            Retour au site
                          </a>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="text-align:center;padding:20px;font-size:12px;color:#999;">
                        Merci pour votre confiance
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>`
    });
    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur envoi email" });
  }
};

