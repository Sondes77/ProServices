const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const axios = require('axios'); // Pour la géolocalisation IP
const db = require('../config/db');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //console.log("Tentative de connexion admin pour :", email);
        // 1. Vérification de l'utilisateur
        const [user] = await db.promise().query("SELECT * FROM utilisateurs WHERE email = ? AND role = ?", [email, 'founder-admin']);
        if (user.length === 0) {
            return res.status(401).json({ message: "Accès refusé" });
        }
        // 2. Vérification du mot de passe
        const validPassword = await bcrypt.compare(password, user[0].mot_de_passe);
        if (!validPassword) {
            return res.status(401).json({ message: "Identifiants invalides" });
        }
        // 3. Récupération des infos de connexion
        const ip =
            req.headers["x-forwarded-for"]?.split(",")[0] ||
            req.headers["x-real-ip"] ||
            req.socket?.remoteAddress;
        const userAgent = req.headers['user-agent'];
        
        // Géolocalisation (Optionnel - via service gratuit ipapi)
        let location = "Inconnue";
        try {
            const geo = await axios.get(`https://ipapi.co/${ip}/json/`);
            location = `${geo.data.city}, ${geo.data.country_name}`;
        } catch (e) { console.log("Erreur geo"); }

        // 4. Enregistrement de la tentative en attente
        const [conn] = await db.promise().query(
            "INSERT INTO connexions (userId, ip_address, device, location, status) VALUES (?, ?, ?, ?, 'pending')",
            [user[0].id, ip, userAgent, location]
        );

        // 5. Génération du Token de vérification (valable 10 min)
        const verifyToken = jwt.sign(
            { connId: conn.insertId, userId: user[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '10m' }
        );
        // 6. Envoi du Mail de sécurité
        const transporter = nodemailer.createTransport({
        host: "smtp.mail.ovh.net",
        port: 465,
        secure: true,
        auth: {
            user: "contact@servicepro.tn",
            pass: "ServicePro610.P###",
        },
        });

        // Vérification SMTP (optionnel en prod mais utile en debug)
        transporter.verify((error) => {
        if (error) {
            console.log("❌ Erreur SMTP :", error);
        } else {
            console.log("✅ SMTP prêt à envoyer");
        }
        });

        const approveUrl = `http://localhost:5000/api/auth/verify-login?token=${verifyToken}&action=approve`;
        const rejectUrl = `http://localhost:5000/api/auth/verify-login?token=${verifyToken}&action=reject`;

        await transporter.sendMail({
        from: `"SERVICEPRO Security" <contact@servicepro.tn>`,
        to: user[0].email, // ✅ FIX (pas user[0])
        subject: "⚠️ Tentative de connexion à votre compte Admin",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
            <h2 style="color:#111;">Tentative de connexion détectée</h2>

            <p>Une tentative de connexion à votre Dashboard Admin vient d'avoir lieu :</p>

            <ul>
                <li><strong>IP:</strong> ${ip}</li>
                <li><strong>Lieu:</strong> ${location}</li>
                <li><strong>Appareil:</strong> ${userAgent}</li>
            </ul>

            <p><strong>Est-ce bien vous ?</strong></p>

            <div style="margin-top:20px;">
                <a href="${approveUrl}"
                style="background:#10b981;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;margin-right:10px;">
                Oui, c'est moi
                </a>

                <a href="${rejectUrl}"
                style="background:#ef4444;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
                Non, ce n'est pas moi
                </a>
            </div>
            </div>
        `,
        });
        res.json({ status: "pending",
                    connId: conn.insertId,
                    message: "Vérification par email envoyée" });

    } catch (error) {
        console.error("Erreur lors de la connexion admin :", error);
        res.status(500).json({ error: error.message });
    }
};

exports.verifyLogin = async (req, res) => {
    const { token, action } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (action === 'approve') {
            // Mettre à jour le statut de la connexion
            await db.promise().query("UPDATE connexions SET status = 'approved' WHERE id = ?", [decoded.connId]);
            
            // Générer le VRAI token de session
            const sessionToken = jwt.sign({ id: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '2h' });

            // Rediriger vers le dashboard avec le token (le front devra le récupérer)
            res.redirect(`http://localhost:3000/login?token=${sessionToken}`);
        } else {
            await db.promise().query("UPDATE connexions SET status = 'rejected' WHERE id = ?", [decoded.connId]);
            res.redirect(`http://localhost:3000/login?alert=unauthorized`);
        }
    } catch (error) {
        res.redirect(`http://localhost:3000/login?alert=expired`);
    }
};