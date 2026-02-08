// backend/models/utilisateurModel.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.findOrCreateUser = async (userInfo, callback) => {
    //console.log("Données complètes reçues de Google :", userInfo);
    const { email,name, given_name, family_name, picture, email_verified, role } = userInfo;
    const hashedPassword = await bcrypt.hash("ServiceProuserfromgooglePW", 10); // 🔐// Pas de mot de passe pour les utilisateurs Google
    const date_creation = new Date(); // Date actuelle  
    const source = "google";

    //console.log("name = ", name);   
    //console.log("given_name = ", given_name);
    //console.log("family_name = ", family_name);

    const query = "SELECT * FROM utilisateurs WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) return callback(err);
        console.log("Résultats de la requête findOrCreateUser :", results);
        if (results.length > 0) {
        // Utilisateur existe
        callback(null, results[0]);
        } else {
        // Création utilisateur
        const insert = "INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role, source, date_creation, photo, email_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(insert, [given_name, family_name, email, hashedPassword, role, source, date_creation, picture, email_verified], (err, result) => {
            if (err) return callback(err);

            const newUser = {
            id: result.insertId,
            nom: name,
            email,
            image: picture,
            };
            callback(null, newUser);
        });
        }
    });
};

