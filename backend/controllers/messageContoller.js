// backend/controllers/messageContoller.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

console.log(process.env.GOOGLE_CLIENT_ID);

// envoyer un message dans une conversation
exports.creerMessage2 = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ message: 'Token manquant' });
    
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token invalide' });
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { conversationId, sender, content} = req.body;
        console.log("je suis creerMessage =", req.body);
        const date_creation = new Date(); // Date actuelle

        const query = `
            INSERT INTO messages (conversation_id, sender, content) VALUES (?, ?, ?)
          `;
    
          const values = [conversationId, sender, content];
    
          db.query(query, values, (err, results) => {
            if (err) {
              console.error('Erreur lors de l\'envoi du message :', err);
              return res.status(500).json({ message: 'Erreur serveur' });
            }
            
            res.status(200).json({ 
              userId: userId,
              message: 'Message envoyé avec succès' 
            });
          });
    
    } catch (error) {
    console.error('Erreur création message:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };
exports.creerMessage = (req, res) => {
  const { conversationId, content, recipientId } = req.body;

  // ID de l'utilisateur connecté
  const token = req.headers['authorization'].split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const senderId = decoded.id;

  const messageId = crypto.randomUUID();

  const sql = `
    INSERT INTO messages (id, conversation_id, sender_id, recipient_id, content)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [messageId, conversationId, senderId, recipientId, content], (err) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });

    res.json({ success: true, messageId });
  });
};
exports.sendMessage = async (req, res) => {
  const { recipientId, content } = req.body;
  console.log("req.body = ", req.body);
  // Authentification
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const senderId = decoded.id;

  try {
    // 1️⃣ Vérifier si une conversation existe
    const [rows] = await db
      .promise()
      .query(
        `
        SELECT id FROM conversations
        WHERE (user1_id = ? AND user2_id = ?)
           OR (user1_id = ? AND user2_id = ?)
        LIMIT 1;
        `,
        [senderId, recipientId, recipientId, senderId]
      );

    let conversationId;

    if (rows.length === 0) {
      // 2️⃣ Créer conversation (premier message)
      await db.promise().query(
      `INSERT INTO conversations (id, user1_id, user2_id) VALUES (UUID(), ?, ?)`,
      [senderId, recipientId]
    );

    // Récupérer la conversation juste insérée
    const [rows] = await db.promise().query(
      `SELECT id FROM conversations WHERE user1_id = ? AND user2_id = ?`,
      [senderId, recipientId]
    );

    conversationId = rows[0].id;
    console.log("👉 Nouvelle conversation créée:", conversationId);

    } else {
      conversationId = rows[0].id;
    }

    // 3️⃣ Ajouter le message
    await db
      .promise()
      .query(
        `
        INSERT INTO messages 
        (id, conversation_id, sender_id, recipient_id, content, is_read)
        VALUES (UUID(), ?, ?, ?, ?, FALSE);
        `,
        [conversationId, senderId, recipientId, content]
      );

    const [userName] = await db.promise().query(
      `SELECT nom FROM utilisateurs WHERE id = ?`,
      [senderId]
    );
    const senderName = userName[0].nom;

    // 4️⃣ Créer notification pour le destinataire
    await db
      .promise()
      .query(
        `
        INSERT INTO notifications 
        (user_id, user_id2, type, title, text, link, unread, notified)
        VALUES (?, ?, ?, ?, ?, ?, true, false);
        `,
        [recipientId, senderId, "message_received", "Nouveau message", `${senderName} vous a envoyé un message`, `/messages/${conversationId}`]
      );

    res.status(201).json({ message: "Message envoyé", conversationId });

  } catch (err) {
    console.error("Erreur envoi message:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.sendMessageContainer2 = async (req, res) => {
  const { recipientId, conversationId, content } = req.body;
  console.log("req.body = ", req.body);

  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const senderId = decoded.id;

  try {
    console.log("👉 Conversation trouvée:", conversationId);

    // --- 🌟 CREATION ID MESSAGE (UUID) ---
    const messageId = uuidv4();

    // Insertion message
    await db.promise().query(
      `
        INSERT INTO messages 
        (id, conversation_id, sender_id, recipient_id, content, is_read)
        VALUES (?, ?, ?, ?, ?, FALSE);
      `,
      [messageId, conversationId, senderId, recipientId, content]
    );

    // Récupérer le message complet
    const [messageRows] = await db.promise().query(
      `
      SELECT
        m.id,
        m.content,
        m.created_at AS timestamp,
        m.is_read,
        s.id AS sender_id,
        s.nom AS sender_nom,
        s.prenom AS sender_prenom,
        s.photo AS sender_avatar
      FROM messages m
      JOIN utilisateurs s ON s.id = m.sender_id
      WHERE m.id = ?
      `,
      [messageId]
    );

    const fullMessage = {
      id: messageRows[0].id,
      content: messageRows[0].content,
      timestamp: messageRows[0].timestamp,
      read: messageRows[0].is_read,
      sender: {
        id: messageRows[0].sender_id,
        name: messageRows[0].sender_nom + " " + messageRows[0].sender_prenom,
        avatar: messageRows[0].sender_avatar
      }
    };

    return res.status(201).json(fullMessage);

  } catch (err) {
    console.error("Erreur envoi message:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.sendMessageContainer = async (req, res) => {
  const { recipientId, conversationId, content, type, groupId } = req.body;
  console.log("req.body = ", req.body);

  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const senderId = decoded.id;

  const io = req.app.locals.io; // récupère socket.io

  try {
    console.log("👉 Conversation trouvée:", conversationId);

    // --- Création ID message ---
    const messageId = uuidv4();

    await db.promise().query(
      `
      INSERT INTO messages 
      (id, conversation_id, sender_id, recipient_id, content, type, groupId, is_read)
      VALUES (?, ?, ?, ?, ?, ?, ?, FALSE);
      `,
      [messageId, conversationId, senderId, recipientId, content, type, groupId]
    );

    // Récup message complet
    const [messageRows] = await db.promise().query(
      `
      SELECT
        m.id,
        m.content,
        m.type,
        m.created_at AS timestamp,
        m.is_read,
        s.id AS sender_id,
        s.nom AS sender_nom,
        s.prenom AS sender_prenom,
        s.photo AS sender_avatar
      FROM messages m
      JOIN utilisateurs s ON s.id = m.sender_id
      WHERE m.id = ?
      `,
      [messageId]
    );

    const fullMessage = {
      id: messageRows[0].id,
      content: messageRows[0].content,
      type: messageRows[0].type,
      timestamp: messageRows[0].timestamp,
      read: messageRows[0].is_read,
      sender: {
        id: messageRows[0].sender_id,
        name: messageRows[0].sender_nom + " " + messageRows[0].sender_prenom,
        avatar: messageRows[0].sender_avatar
      },
      conversationId
    };

    const [userName] = await db.promise().query(
      `SELECT nom FROM utilisateurs WHERE id = ?`,
      [senderId]
    );

    const senderName = userName[0].nom;

    // 4️⃣ Créer notification pour le destinataire
    await db
      .promise()
      .query(
        `
        INSERT INTO notifications 
        (user_id, user_id2, type, title, text, link, unread)
        VALUES (?, ?, ?, ?, ?, ?, true);
        `,
        [recipientId, senderId, "message_received", "Nouveau message", `${senderName} vous a envoyé un message`, `/messages/${conversationId}`]
      );

    // ---- EMISSION TEMPS RÉEL ----
    const onlineUsers = req.app.locals.onlineUsers; // si utilisé
    console.log("onlineUsers = ", onlineUsers);
    // Émettre vers le destinataire s'il est connecté
    if (onlineUsers && onlineUsers[recipientId]) {
      io.to(onlineUsers[recipientId]).emit("newMessage", fullMessage);
      console.log("📨 Message envoyé en temps réel à", recipientId);
    }

    return res.status(201).json(fullMessage);

  } catch (err) {
    console.error("Erreur envoi message:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer tous les conversations d'un utilisateur
exports.getConversations = (req, res) => {
  try {
    // ─── Vérification du token ─────────────────────────────
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Token manquant" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token invalide" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    console.log("▶ getConversations() pour user =", userId);

    // ─── Query SQL adaptée aux interfaces Conversation.ts ─────────────────────
    const sql = `
      SELECT
        c.id AS conversation_id,

        u.id AS participant_id,
        CONCAT(u.nom, ' ', u.prenom) AS participant_name,
        u.photo AS participant_avatar,
        u.role AS participant_role,

        m.content AS last_message_content,
        m.type,
        m.created_at AS last_message_timestamp,
        m.sender_id AS last_message_sender,

        (
          SELECT COUNT(*) 
          FROM messages 
          WHERE messages.conversation_id = c.id
            AND messages.recipient_id = ?
            AND messages.is_read = FALSE
        ) AS unread_count

      FROM conversations c
      JOIN utilisateurs u 
        ON (u.id != ? AND (u.id = c.user1_id OR u.id = c.user2_id))

      LEFT JOIN messages m ON m.id = (
        SELECT id FROM messages
        WHERE conversation_id = c.id
        ORDER BY created_at DESC LIMIT 1
      )

      WHERE c.user1_id = ? OR c.user2_id = ?;
    `;

    const params = [userId, userId, userId, userId];

    db.query(sql, params, (err, results) => {
      if (err) {
        console.error("❌ Erreur SQL getConversations :", err);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      // ─── Transformer résultat SQL → interface Conversation (frontend) ─────
      const conversations = results.map(row => ({
        id: row.conversation_id,
        participant: {
          id: row.participant_id,
          name: row.participant_name,
          avatar: row.participant_avatar,
          role: row.participant_role,
        },
        lastMessage: {
          content: row.last_message_content || "",
          type: row.type || "text",
          timestamp: row.last_message_timestamp || null,
          sender: row.last_message_sender || null,
        },
        unreadCount: row.unread_count || 0,
      }));

      res.json(conversations);
    });

  } catch (err) {
    console.error("❌ Erreur getConversations :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getConversations2 = (req, res) => {

   const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token invalide' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  console.log("je suis getConversations = ", userId);
  db.query('SELECT * FROM conversations where participant_id = ?',[userId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des messages:', err);
      return res.status(500).send('Erreur serveur');
    }
    res.status(200).json(result);
  });
};

// Récupérer tous les utilisateurs
exports.getMessages = (req, res) => {
  const { id } = req.params;
  //const userId = req.utilisateur.id;

  const authHeader = req.headers['authorization'];
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token manquant' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log("Decoded token:", decoded);
  
      const userId = decoded.id;
  
      const sql = `
        SELECT
          m.id,
          m.content,
          m.type,
          m.groupId,
          m.created_at AS timestamp,
          m.is_read,

          s.id AS sender_id,
          CONCAT(s.nom, ' ', s.prenom) AS participant_name,
          s.photo AS sender_avatar,
          s.role AS sender_role,

          r.id AS recipient_id,
          CONCAT(r.nom, ' ', r.prenom) AS participant_name,
          r.photo AS recipient_avatar,
          r.role AS recipient_role

        FROM messages m
        JOIN utilisateurs s ON s.id = m.sender_id
        JOIN utilisateurs r ON r.id = m.recipient_id
        WHERE m.conversation_id = ?
        ORDER BY m.created_at ASC;
      `;
      
      db.query(sql, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Erreur serveur" });

        const formatted = rows.map(m => ({
          id: m.id,
          content: m.content,
          type: m.type,
          groupId: m.groupId,
          timestamp: m.timestamp,
          read: m.is_read,
          //notified: m.notified,
          sender: {
            id: m.sender_id,
            name: m.sender_name,
            avatar: m.sender_avatar,
            role: m.sender_role
          },
          recipient: {
            id: m.recipient_id,
            name: m.recipient_name,
            avatar: m.recipient_avatar,
            role: m.recipient_role
          }
        }));

        db.query('UPDATE messages SET is_read = TRUE WHERE conversation_id = ? AND recipient_id = ? AND is_read = FALSE', [id, userId], (err) => {
          if (err) console.error('Erreur mise à jour is_read :', err);
        });
        db.query('UPDATE notifications SET unread = FALSE, notified = TRUE WHERE link LIKE ? AND user_id = ? AND unread = TRUE', [`%${id}%`, userId], (err) => {
          if (err) console.error('Erreur mise à jour unread :', err);
        });
        res.json(formatted);
      });
    } catch (err) {
    console.log("JWT error:", err.name);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expiré" });
    }

    return res.status(403).json({ message: "Token invalide" });
  }
};

// Récupérer les messages par ID de conversation
exports.getMessageById = (req, res) => {
  const authHeader = req.headers['authorization'];
  const { id } = req.params;
  console.log("je suis getMessageById = ",req.params);
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token invalide' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(id);
  db.query('SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des services:', err);
      return res.status(500).send('Erreur serveur');
    }
    console.log(result.length);
    res.status(200).json(result);
  });
};

exports.markAsRead = (req, res) => {
  const { conversationId } = req.body;

  const token = req.headers['authorization'].split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  const sql = `
    UPDATE messages
    SET is_read = TRUE
    WHERE conversation_id = ?
      AND recipient_id = ?
  `;

  db.query(sql, [conversationId, userId], (err) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json({ success: true });
  });
};
