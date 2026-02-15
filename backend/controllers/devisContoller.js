// backend/controllers/devisContoller.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

// creer un devis depuis le client
exports.createDevis = async (req,res)=>{
  try{
    const { client_id, service_id, objet, date_souhaitee, description, professionnel_id } = req.body;
    console.log(client_id, service_id, objet, date_souhaitee, description, professionnel_id);
    const [result] = await db.promise().query(`
      INSERT INTO devis
      (client_id, service_id, objet, description, date_souhaitee, pro_id)
      VALUES (?,?,?,?,?,?)
    `,[client_id,service_id,objet,description,date_souhaitee,professionnel_id]);

    const devisId = result.insertId; // ✅ ID ici

    // 👤 Nom auteur
    const [rows] = await db.promise().query(
      `SELECT nom FROM utilisateurs WHERE id = ?`,
      [client_id]
    );

    const senderName = rows[0]?.nom || "Un utilisateur";

    // 🔔 Notification destinataire
    await db.promise().query(
      `INSERT INTO notifications
       (user_id, user_id2, type, title, text, link, unread, notified, created_at)
       VALUES (?, ?, ?, ?, ?, ?, true, false, NOW())`,
      [
        professionnel_id,
        client_id,
        "devis_created",
        "Nouveau devis",
        `${senderName} vous a envoyé un devis`,
        `/devis/${devisId}`
      ]
    );

    // ✅ OK
    res.status(200).json({
      message: "Devis créé avec succès",
      devisId
    });

  }catch(e){
    console.error(e);
    res.status(500).json({ error:"Erreur création devis" });
  }
};

// Récupérer les demandes de devis pour un professionnel
exports.getDemandesForPro = async (req,res)=>{
  const id = req['utilisateur'].id;
  
  const [rows] = await db.promise().query(`
    SELECT d.*, u.nom as pro_nom, u.prenom as pro_prenom, u.role, u.photo
    FROM devis d
    JOIN utilisateurs u ON u.id=d.client_id
    WHERE d.pro_id=? order by d.created_at desc
  `,[id]);
 
  res.json(rows);
};
  
exports.proposeDevis = async (req,res)=>{
  try{
    const { id } = req.params;
    const user_id = req["utilisateur"].id;
    const { prix, message_pro, date_intervention,pro_id } = req.body;

    await db.promise().query(`
      UPDATE devis SET
        prix=?,
        message_pro=?,
        date_intervention=?,
        statut='proposed'
      WHERE id=?
    `,[prix,message_pro,date_intervention,id]);

    // 👤 Nom auteur
    const [rows] = await db.promise().query(
      `SELECT nom FROM utilisateurs WHERE id = ?`,
      [user_id]
    );

    const senderName = rows[0]?.nom || "Un utilisateur";

    // 🔔 Notification destinataire
    await db.promise().query(
      `INSERT INTO notifications
       (user_id, user_id2, type, title, text, link, unread, notified, created_at)
       VALUES (?, ?, ?, ?, ?, ?, true, false, NOW())`,
      [
        pro_id,
        user_id,
        "devis_proposed",
        "Nouvelle proposition",
        `${senderName} vous a envoyé une proposition`,
        `/devis/${id}`
      ]
    );

    res.json({ ok:true });

  }catch(e){
    res.status(500).json({ error:"Erreur proposition" });
  }
};

exports.getMyDevis = async (req,res)=>{
  const id = req['utilisateur'].id;
  console.log("userId = ", id);
  const [rows] = await db.promise().query(`
    SELECT d.*, u.nom as pro_nom, u.prenom as pro_prenom, u.role, u.photo
    FROM devis d
    LEFT JOIN utilisateurs u ON u.id=d.pro_id
    WHERE client_id=? order by d.created_at desc
  `,[id]);

  res.json(rows);
};

exports.acceptDevis = async (req,res)=>{

  const { pro_id } = req.body;
  const user_id = req["utilisateur"].id;

  await db.promise().query(
    "UPDATE devis SET statut='accepted' WHERE id=? AND client_id=?",
    [req.params.id, user_id]
  );

  if (!res){
    
  }

  // 👤 Nom auteur
  const [rows] = await db.promise().query(
    `SELECT nom FROM utilisateurs WHERE id = ?`,
    [user_id]
  );

  const senderName = rows[0]?.nom || "Un utilisateur";

  // 🔔 Notification destinataire
  await db.promise().query(
    `INSERT INTO notifications
      (user_id, user_id2, type, title, text, link, unread, notified, created_at)
      VALUES (?, ?, ?, ?, ?, ?, true, false, NOW())`,
    [
      pro_id,
      user_id,
      "devis_proposed",
      "Proposition acceptée",
      `${senderName} a accepté votre proposition`,
      `/devis/${req.params.id}`
    ]
  );
  res.json({ ok:true });
};

exports.rejectDevis = async (req,res)=>{

  const { pro_id } = req.body;
  const user_id = req["utilisateur"].id;

  await db.promise().query(
    "UPDATE devis SET statut='rejected' WHERE id=? AND client_id=?",
    [req.params.id, user_id]
  );

  // 👤 Nom auteur
  const [rows] = await db.promise().query(
    `SELECT nom FROM utilisateurs WHERE id = ?`,
    [user_id]
  );

  const senderName = rows[0]?.nom || "Un utilisateur";

  // 🔔 Notification destinataire
  await db.promise().query(
    `INSERT INTO notifications
      (user_id, user_id2, type, title, text, link, unread, notified, created_at)
      VALUES (?, ?, ?, ?, ?, ?, true, false, NOW())`,
    [
      pro_id,
      user_id,
      "devis_proposed",
      "Proposition refusée",
      `${senderName} a refusé votre proposition`,
      `/devis/${req.params.id}`
    ]
  );

  res.json({ ok:true });
};

exports.cancelDevis = async (req,res)=>{
  try{
    const { id } = req.params;
    const user_id = req["utilisateur"].id;
    const { pro_id } = req.body;

    await db.promise().query(
      "UPDATE devis SET statut='cancelled' WHERE id=? AND pro_id=?",
      [req.params.id, user_id]
    );


    // 👤 Nom auteur
    const [rows] = await db.promise().query(
      `SELECT nom FROM utilisateurs WHERE id = ?`,
      [user_id]
    );

    const senderName = rows[0]?.nom || "Un utilisateur";

    // 🔔 Notification destinataire
    await db.promise().query(
      `INSERT INTO notifications
       (user_id, user_id2, type, title, text, link, unread, notified, created_at)
       VALUES (?, ?, ?, ?, ?, ?, true, false, NOW())`,
      [
        pro_id,
        user_id,
        "devis_cancelled",
        "Demande annulé",
        `${senderName} a annulé votre demande`,
        `/devis/${id}`
      ]
    );

    res.json({ ok:true });

  }catch(e){
    res.status(500).json({ error:"Erreur proposition" });
  }
};
