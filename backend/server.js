// backend/server.js
/*const express = require('express');
const dotenv = require('dotenv');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const uploadRoutes = require('./routes/upload'); 
const messageRoutes = require('./routes/messageRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes'); 
const notificationsRoutes = require('./routes/notificationsRoutes'); 
const devisRoutes = require('./routes/devisRoutes'); 
const AminLogRoutes = require('./routes/AdminLogRoutes'); 
const cors = require('cors');
const path = require('path');
const http = require('http');          // ⬅️ Nécessaire pour Socket.IO
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);  // ⬅️ Serveur HTTP pour socket.io

// === SOCKET.IO ===  
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ['websocket'], // IMPORTANT pour éviter les erreurs CORS
  },
});

// Liste des utilisateurs connectés
let onlineUsers = {};
app.locals.onlineUsers = onlineUsers;

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
  console.log("🔌 Nouveau client connecté", socket.id);

  // Lorsqu'un utilisateur s'identifie au socket
  socket.on("user_connected", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log("🟢 Utilisateur connecté:", userId, "socket:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ Déconnexion d’un client:", socket.id);
    Object.keys(onlineUsers).forEach(uid => {
      if (onlineUsers[uid] === socket.id) delete onlineUsers[uid];
    });
  });
});

// Permet d'utiliser io dans les contrôleurs
app.locals.io = io;

// =========================
// Middlewares + Routes
// =========================
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-forwarded-for'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', utilisateurRoutes);
app.use('/api', serviceRoutes);
app.use('/api', uploadRoutes); 
app.use('/api', messageRoutes); 
app.use('/api', reviewRoutes); 
app.use('/api', notificationsRoutes); 
app.use('/api', devisRoutes);
app.use('/api', AminLogRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'routes/uploads')));

// Lancer le serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});*/

// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const uploadRoutes = require('./routes/upload');
const messageRoutes = require('./routes/messageRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const notificationsRoutes = require('./routes/notificationsRoutes');
const devisRoutes = require('./routes/devisRoutes');
const cors = require('cors');
const path = require('path');
const http = require('http');          // ⬅️ Nécessaire pour Socket.IO
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);  // ⬅️ Serveur HTTP pour socket.io

// === SOCKET.IO ===
const io = new Server(server, {
  cors: {
    origin: ["https://servicepro.tn", "https://www/servicepro.tn"],
    methods: ["GET", "POST"],
    credentials: true,
    transports: ['websocket'], // IMPORTANT pour éviter les erreurs CORS
  },
});

// Liste des utilisateurs connectés
let onlineUsers = {};
app.locals.onlineUsers = onlineUsers;

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
  console.log("🔌 Nouveau client connecté", socket.id);

  // Lorsqu'un utilisateur s'identifie au socket
  socket.on("user_connected", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log("🟢 Utilisateur connecté:", userId, "socket:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ Déconnexion d’un client:", socket.id);
    Object.keys(onlineUsers).forEach(uid => {
      if (onlineUsers[uid] === socket.id) delete onlineUsers[uid];
    });
  });
});

// Permet d'utiliser io dans les contrôleurs
app.locals.io = io;

// =========================
app.use(cors({
  origin: ['https://servicepro.tn', 'https://www/servicepro.tn'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-forwarded-for'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', utilisateurRoutes);
app.use('/api', serviceRoutes);
app.use('/api', uploadRoutes);
app.use('/api', messageRoutes);
app.use('/api', reviewRoutes);
app.use('/api', notificationsRoutes);
app.use('/api', devisRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'routes/uploads')));

// Lancer le serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

