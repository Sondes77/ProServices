import React, { useRef, useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  ChevronRight, 
  CheckCircle, 
  Clock,
  User as UserIcon,
  Send,
  ArrowLeft,
  Paperclip,
  Image
} from 'lucide-react';
import { Conversation, Message, User } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';
import Swal from "sweetalert2";

//import { io } from "socket.io-client";
//const socket = io("http://localhost:5000", { transports: ["websocket"] });

interface MessagesProps {
  user: User;
}

const Messages: React.FC<MessagesProps> = ({ user }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // --- ⚡ Enregistrement socket pour cet utilisateur ---
 /*useEffect(() => {
  socket.on("connect", () => {
    console.log("Socket connecté avec id", socket.id);
    socket.emit("user_connected", user.id);
  });
}, [user.id]);*/

  // --- Formatter timestamp ---
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
    if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString('fr-FR', { weekday: 'long' });
    }
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  // --- Charger toutes les conversations ---
  useEffect(() => {
    const fetchConversations = async () => {
      if (!token){
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");

        // Popup moderne + timer 3 sec
        Swal.fire({
          title: "Session expirée",
          text: "Vous allez être redirigé vers la page de connexion.",
          icon: "warning",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "center",
          customClass: {
            popup: "rounded-2xl shadow-lg", // style chic
          }
        });

        // Attendre 3 secondes puis rediriger
        setTimeout(() => {
          navigate("/connexion");
        }, 3000);

        return;
      } 
      setLoadingConversations(true);
      try {
        const res = await fetch(`http://localhost:5000/api/conversations/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Erreur API conversations');
        const data = await res.json();
        setConversations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingConversations(false);
      }
    };
    fetchConversations();
  }, [user.id, token, navigate]);

  // --- Charger les messages d'une conversation ---
  const openConversation = async (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setLoadingMessages(true);
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${conversation.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erreur API messages');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  // --- Envoyer un message ---
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || !token) return;

    try {
      const res = await fetch('http://localhost:5000/api/messagecontainer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          recipientId: selectedConversation.participant?.id,
          conversationId: selectedConversation.id,
          content: newMessage
        })
      });
      if (!res.ok) throw new Error('Erreur API sendMessage');
      const savedMessage = await res.json();

      // Ajouter le message localement
      setMessages(prev => [...prev, savedMessage]);

      // Mettre à jour la dernière conversation
      setConversations(prev =>
        prev.map(conv =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: savedMessage, unreadCount: 0 }
            : conv
        )
      );

      setNewMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      console.log("📩 Nouveau message reçu:", message);

      if (selectedConversation && message.sender.id === selectedConversation.participant.id) {
        setMessages(prev => [...prev, message]);
      }

      setConversations(prev =>
        prev.map(conv =>
          conv.id === selectedConversation?.id
            ? {
                ...conv,
                lastMessage: {
                  ...message,
                  sender: message.sender.id // on ne garde que l’id
                },
                unreadCount: 0
              }
            : conv
        )
      );
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [selectedConversation]);

  useEffect(() => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current;
      container.scrollTop = container.scrollHeight; // positionner à la fin
    }
  }, [messages]); // déclenché après le chargement
  
  // --- Filtrer les conversations ---
  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Affichage conversation ---
  if (selectedConversation) {
    return (
     
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-2rem)]">
        <div className="bg-[#e0692d] p-4 flex items-center">
          <button onClick={() => setSelectedConversation(null)} className="text-white mr-4 hover:bg-[#f07e40] p-2 rounded-full transition-colors duration-200">
            <ArrowLeft size={20} />
          </button>
          <img src={selectedConversation.participant.avatar} alt={selectedConversation.participant.name} className="w-10 h-10 rounded-full object-cover mr-3"/>
          <div>
            <h2 className="text-lg font-semibold text-white">{selectedConversation.participant.name}</h2>
            <p className="text-white text-opacity-80 text-sm">
              {selectedConversation.participant.role === 'professional' ? 'Professionnel' : 'Utilisateur'}
            </p>
          </div>
        </div>

        <div className="flex flex-col h-[calc(100%-180px)] bg-gray-50">
          <div ref={messagesEndRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {loadingMessages ? (
              <p>Chargement des messages...</p>
            ) : messages.length === 0 ? (
              <p>Aucun message</p>
            ) : (
              messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex ${Number(msg.sender.id) === Number(user.id) ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`${
                      Number(msg.sender.id) === Number(user.id)
                        ? 'bg-[#e0692d] text-white'
                        : 'bg-white text-gray-800'
                    } rounded-lg p-3 max-w-[70%] shadow`}
                  >
                    <p>{msg.content}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        Number(msg.sender.id) === Number(user.id)
                          ? 'text-white text-opacity-80'
                          : 'text-gray-500'
                      }`}
                    >
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  </div>
                </div>
              ))
            )}
           
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex items-center space-x-2">
            <button type="button" className="p-2 text-gray-500 hover:text-[#e0692d] transition-colors duration-200"><Paperclip size={20} /></button>
            <button type="button" className="p-2 text-gray-500 hover:text-[#e0692d] transition-colors duration-200"><Image size={20} /></button>
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Écrivez votre message..." className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"/>
            <button type="submit" disabled={!newMessage.trim()} className="p-2 text-white bg-[#e0692d] rounded-lg hover:bg-[#f07e40] transition-colors duration-200"><Send size={20}/></button>
          </form>
        </div>
      </div>
    );
  }

  // --- Affichage liste des conversations ---
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#e0692d] p-4">
        <h2 className="text-xl font-semibold text-white">Historique des messages</h2>
        <p className="text-white text-opacity-80 text-sm">Vos conversations récentes</p>
      </div>
      <div className="p-4">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <Search size={18} />
          </div>
          <input type="text" placeholder="Rechercher une conversation..." className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e0692d] focus:border-transparent transition-colors duration-200" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
         <div className="space-y-3">
          {loadingConversations ? (
            <p>Chargement des conversations...</p>
          ) : filteredConversations.length === 0 ? (
            <p>Aucune conversation trouvée</p>
          ) : (
              filteredConversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                  onClick={() => openConversation(conversation)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="relative">
                        <img 
                          src={conversation.participant.avatar} 
                          alt={conversation.participant.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                          conversation.participant.role === 'professional' ? 'bg-blue-500' : 'bg-green-500'
                        }`}></span>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900">{conversation.participant.name}</h4>
                        <p className="text-sm text-gray-500">
                          {conversation.participant.role === 'professional' ? 'Professionnel' : 'Utilisateur'}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{formatTimestamp(conversation.lastMessage.timestamp)}</span>
                  </div>
                  
                  <div className="mt-3 flex items-start">
                    {conversation.lastMessage.sender === conversation.participant.id ? (
                      <UserIcon size={16} className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                    ) : (
                      <MessageSquare size={16} className="mt-1 mr-2 flex-shrink-0 text-[#e0692d]" />
                    )}
                    <p className="text-sm text-gray-600 flex-grow truncate">
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center">
                      {conversation.unreadCount > 0 ? (
                        <div className="flex items-center">
                          <Clock size={14} className="text-[#e0692d] mr-1" />
                          <span className="text-xs text-[#e0692d]">
                            {conversation.unreadCount} {conversation.unreadCount === 1 ? 'nouveau message' : 'nouveaux messages'}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <CheckCircle size={14} className="text-green-500 mr-1" />
                          <span className="text-xs text-green-500">Lu</span>
                        </div>
                      )}
                    </div>
                    <button className="text-[#e0692d] flex items-center text-sm hover:underline">
                      Voir <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
