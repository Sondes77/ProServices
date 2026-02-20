import React, { useRef, useState, useEffect, useMemo } from 'react';
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
  Image,
  Check,
  CheckCheck
} from 'lucide-react';
import { Conversation, Message, User } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';
import Swal from "sweetalert2";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useParams } from "react-router-dom";
import { formatDate } from 'date-fns';
import { urlBase } from "../config.js";

//import { io } from "socket.io-client";
//const socket = io("http://localhost:5000", { transports: ["websocket"] });

interface MessagesProps {
  user: User;
}

type ImageGroup = {
  type: "image-group";
  sender: any;
  timestamp: string;
  images: Message[];
};

const Messages: React.FC<MessagesProps> = ({ user }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [readyToShow, setReadyToShow] = useState(false);
  const token = localStorage.getItem('token');
  //const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const emojiButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstLoadRef = useRef(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [attachedImages, setAttachedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
 
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

 /* useEffect(() => {
  const handleFocus = () => {
    if (!selectedConversation) return;

    // Mettre à jour localement les messages
    setMessages(prev =>
      prev.map(msg =>
        msg.sender.id !== user.id && !msg.read
          ? { ...msg, read: true }
          : msg
      )
    );

    // Envoyer l'update au serveur pour les mettre à jour dans la DB
    socket.emit("markAsRead", {
      conversationId: selectedConversation.id
    });
  };

  const input = inputRef.current;
  input?.addEventListener("focus", handleFocus);

  return () => {
    input?.removeEventListener("focus", handleFocus);
  };
}, [selectedConversation, socket]);*/

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  // --- Sélection des fichiers ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setAttachedFiles(prev => [...prev, ...Array.from(files)]);
    
    setTimeout(() => {
      if (e.target) e.target.value = "";
    }, 0);
  };

  // --- Sélection des images ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setAttachedImages(prev => [...prev, ...Array.from(files)]);
    
    setTimeout(() => {
      if (e.target) e.target.value = "";
    }, 0);
  };

  // --- Cleanup URL.createObjectURL pour éviter fuite mémoire ---
  useEffect(() => {
    return () => {
      attachedImages.forEach(file => URL.revokeObjectURL(file as any));
    };
  }, [attachedImages]);


  useEffect(() => {
    if (!conversationId) return;
    if (conversations.length === 0) return;

    const conv = conversations.find(
      c => String(c.id) === String(conversationId)
    );

    // ouvre seulement si différente de celle déjà ouverte
    if (conv && selectedConversation?.id !== conv.id) {
      openConversation(conv);
    }

  }, [conversationId, conversations]);

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
        const res = await fetch(`${urlBase}/conversations/${user.id}`, {
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
      firstLoadRef.current = true;
      setReadyToShow(false);
      setSelectedConversation(conversation);
      setLoadingMessages(true);
      try {
        const res = await fetch(`${urlBase}/messages/${conversation.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMessages(false);
      }
    };

  // --- Envoi des fichiers et images (optimisé) ---
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConversation || !token) return;
    if (!newMessage.trim() && attachedFiles.length === 0 && attachedImages.length === 0) return;

    const saved: Message[] = [];
    const groupId = Date.now().toString();

    // upload files/images
    const all = [...attachedFiles, ...attachedImages];

    const uploads = all.map(async file => {
      const fd = new FormData();
      fd.append("file", file);

      const up = await fetch(`${urlBase}/upload-message-file`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });

      const upData = await up.json();

      const msg = await fetch(`${urlBase}/messagecontainer`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          conversationId: selectedConversation.id,
          recipientId: selectedConversation.participant.id,
          content: upData.fileUrl,
          type: upData.type,
          groupId: upData.type === "image" ? groupId : undefined
        })
      });

      return await msg.json();
    });

    saved.push(...await Promise.all(uploads));

    if (newMessage.trim()) {
      const res = await fetch(`${urlBase}/messagecontainer`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          conversationId: selectedConversation.id,
          recipientId: selectedConversation.participant.id,
          content: newMessage,
          type: "text"
        })
      });
      saved.push(await res.json());
      setNewMessage("");
    }

    setAttachedFiles([]);
    setAttachedImages([]);
    setMessages(prev => [...prev, ...saved]);
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
    const handleMessageUpdate = (update: { id: number; notified?: boolean; read?: boolean }) => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === update.id ? { ...msg, ...update } : msg
        )
      );
    };

    socket.on("messageUpdate", handleMessageUpdate);

    return () => {
      socket.off("messageUpdate", handleMessageUpdate);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Si le click n'est pas sur le picker ET pas sur le bouton emoji
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
      const container = messagesContainerRef.current;
      if (!container || messages.length === 0) return;
  
      if (firstLoadRef.current) {
        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight;
  
          // ⏱️ micro délai pour laisser le DOM se stabiliser
          setTimeout(() => {
            requestAnimationFrame(() => {
              setReadyToShow(true);
              firstLoadRef.current = false;
              setLoadingMessages(false);
            });
          }, 1500);
          
        });
      } else {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    }, [messages]);
 
  // --- Filtrer les conversations ---
  const filteredConversations = useMemo(() => {
      return [...conversations]
        .filter(c =>
          c.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort(
          (a, b) =>
            new Date(b.lastMessage.timestamp).getTime() -
            new Date(a.lastMessage.timestamp).getTime()
        );
    }, [conversations, searchQuery]);

    const handleProfileClick = (professionalId: string, role: string) => {
      if(role === 'professional') {
        navigate(`/professional/${professionalId}`);}
      else if(role === 'user'){
        navigate(`/user/${professionalId}`);
      }
    
    if(token){
      
    } else {

    }
  };

  function Timestamp({ ts }) {
    return (
      <span className="text-xs mt-1 block opacity-70 text-right">
        {formatTimestamp(ts)}
      </span>
    );
  }

  function ImageGalleryBubble({ group, isMine, onOpen }) {
    const urls = group.images.map(img => `http://localhost:5000${img.content}`);
    const count = urls.length;

    const bubbleClass = `rounded-xl p-2 max-w-[70%] shadow ${
      isMine ? "bg-[#e0692d]" : "bg-white"
    }`;

    // ---------- LAYOUTS DYNAMIQUES ----------

    // ✅ 1 IMAGE — grande
    if (count === 1) {
      return (
        <div className={bubbleClass}>
          <img
            src={urls[0]}
            onClick={() => onOpen(urls, 0)}
            className="rounded-lg max-h-72 max-w-[320px] object-cover cursor-pointer"
          />
          <Timestamp ts={group.timestamp} />
        </div>
      );
    }

    // ✅ 2 IMAGES — 2 colonnes
    if (count === 2) {
      return (
        <div className={bubbleClass}>
          <div className="grid grid-cols-2 gap-1">
            {urls.map((u, i) => (
              <img
                key={i}
                src={u}
                onClick={() => onOpen(urls, i)}
                className="h-36 w-full object-cover rounded-lg cursor-pointer"
              />
            ))}
          </div>
          <Timestamp ts={group.timestamp} />
        </div>
      );
    }

    // ✅ 3 IMAGES — layout WhatsApp
    if (count === 3) {
      return (
        <div className={bubbleClass}>
          <div className="grid grid-cols-2 gap-1">
            <img
              src={urls[0]}
              onClick={() => onOpen(urls, 0)}
              className="row-span-2 h-[148px] w-full object-cover rounded-lg cursor-pointer"
            />

            <img
              src={urls[1]}
              onClick={() => onOpen(urls, 1)}
              className="h-[72px] w-full object-cover rounded-lg cursor-pointer"
            />

            <img
              src={urls[2]}
              onClick={() => onOpen(urls, 2)}
              className="h-[72px] w-full object-cover rounded-lg cursor-pointer"
            />
          </div>
          <Timestamp ts={group.timestamp} />
        </div>
      );
    }

    // ✅ 4+ IMAGES — grille + overlay
    const show = urls.slice(0, 4);
    const extra = urls.length - 4;

    return (
      <div className={bubbleClass}>
        <div className="grid grid-cols-2 gap-1">
          {show.map((u, i) => (
            <div key={i} className="relative">
              <img
                src={u}
                onClick={() => onOpen(urls, i)}
                className="h-32 w-full object-cover rounded-lg cursor-pointer"
              />

              {i === 3 && extra > 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-bold rounded-lg">
                  +{extra}
                </div>
              )}
            </div>
          ))}
        </div>
        <Timestamp ts={group.timestamp} />
      </div>
    );
  }

  function groupMessages(list: Message[]): (Message | ImageGroup)[] {
    const result: (Message | ImageGroup)[] = [];

    for (let i = 0; i < list.length; i++) {
      const msg = list[i];

      if (msg.type === "image" && msg.groupId) {
        const group: Message[] = [msg];
        let j = i + 1;

        while (
          j < list.length &&
          list[j].type === "image" &&
          list[j].groupId === msg.groupId &&
          list[j].sender.id === msg.sender.id
        ) {
          group.push(list[j]);
          j++;
        }

        result.push({
          type: "image-group",
          sender: msg.sender,
          timestamp: msg.timestamp,
          //notified: msg.notified,
          read: msg.read,
          images: group
        });

        i = j - 1;
      } else {
        result.push(msg);
      }
    }

    return result;
  }

  const groupedMessages = useMemo(() => {
  const sorted = [...messages].sort(
    (a, b) =>
      new Date(a.timestamp).getTime() -
      new Date(b.timestamp).getTime()
  );

  return groupMessages(sorted);
}, [messages]);
// ---------- GALLERY BUBBLE ----------

  // --- Affichage conversation ---
  if (selectedConversation) {
    return (
     
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-2rem)]">
        {previewImages.length > 0 && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50">

            {/* zone clic fermeture */}
            <div
              className="absolute inset-0"
              onClick={() => setPreviewImages([])}
            />

            {/* container */}
            <div className="relative z-10 flex flex-col items-center">

              {/* IMAGE */}
              <img
                src={previewImages[previewIndex]}
                className="max-h-[75vh] max-w-[80vw] rounded-xl shadow-2xl object-contain bg-white"
              />

              {/* compteur */}
              {previewImages.length > 1 && (
                <div className="mt-3 text-white text-sm opacity-80">
                  {previewIndex + 1} / {previewImages.length}
                </div>
              )}

              {/* boutons navigation */}
              {previewImages.length > 1 && (
                <>
                  {/* PREV */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewIndex(i =>
                        i === 0 ? previewImages.length - 1 : i - 1
                      );
                    }}
                    className="absolute left-[-60px] top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 text-2xl backdrop-blur transition"
                  >
                    ‹
                  </button>

                  {/* NEXT */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewIndex(i =>
                        i === previewImages.length - 1 ? 0 : i + 1
                      );
                    }}
                    className="absolute right-[-60px] top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 text-2xl backdrop-blur transition"
                  >
                    ›
                  </button>
                </>
              )}

              {/* bouton fermer */}
              <button
                onClick={() => setPreviewImages([])}
                className="absolute -top-10 right-0 text-white text-2xl opacity-70 hover:opacity-100"
              >
                ✕
              </button>

            </div>
          </div>
        )}
        <div className="bg-[#e0692d] p-4 flex items-center">
          <button onClick={() => { setSelectedConversation(null); navigate("/messages"); }} className="text-white mr-4 hover:bg-[#f07e40] p-2 rounded-full transition-colors duration-200">
            <ArrowLeft size={20} />
          </button>
          <img src={selectedConversation.participant.avatar} alt={selectedConversation.participant.name} className="w-10 h-10 rounded-full object-cover mr-3"/>
          <div>
            <h2 className="text-lg font-semibold text-white cursor-pointer" onClick={() => handleProfileClick(selectedConversation.participant.id, selectedConversation.participant.role)}>{selectedConversation.participant.name}</h2>
            <p className="text-white text-opacity-80 text-sm">
              {selectedConversation.participant.role === 'professional' ? 'Professionnel' : 'Utilisateur'}
            </p>
          </div>
        </div>

        <div className="flex flex-col h-[calc(100%-180px)] bg-gray-50">
          <div ref={messagesContainerRef} className={`flex-1 overflow-y-auto p-4 space-y-4 transition-opacity duration-150 ${
              readyToShow ? "opacity-100" : "opacity-0"
            }`}>

            {groupedMessages.map((msg: any, i) => {
              const isMine = Number(msg.sender.id) === Number(user.id);

              // Messages en groupe (image-group)
              if (msg.type === "image-group") {
                return (
                  <div key={i} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <ImageGalleryBubble
                      group={msg}
                      isMine={isMine}
                      onOpen={(urls, idx) => {
                        setPreviewImages(urls);
                        setPreviewIndex(idx);
                      }}
                    />
                  </div>
                );
              }

              return (
                <div key={msg.id} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                  {/* Bulle du message */}
                  <div className={`rounded-lg p-3 max-w-[70%] shadow ${isMine ? 'bg-[#e0692d] text-white' : 'bg-white text-gray-900'}`}>
                    {msg.type === "text" && msg.content}
                    {msg.type === "file" && <a href={`http://localhost:5000${msg.content}`}>📎 Télécharger</a>}
                    {msg.type === "image" && (
                      <img
                        src={`http://localhost:5000${msg.content}`}
                        className="rounded-lg max-h-64 max-w-[260px] object-cover cursor-pointer hover:opacity-90 transition"
                        onClick={() => {
                          setPreviewImages([`http://localhost:5000${msg.content}`]);
                          setPreviewIndex(0);
                        }}
                      />
                    )}
                  </div>

                  {/* Temps + check collés à droite comme WhatsApp */}
                  {isMine && (
                    <div className="flex items-end space-x-1 text-xs text-gray-500">
                      <span>{formatTimestamp(msg.created_at || msg.timestamp)}</span>
                      {msg.read ? (
                        <CheckCheck className="text-orange-400 w-4 h-4" /> // lu
                      ) /*: msg.notified ? (
                        <CheckCheck className="text-gray-400 w-4 h-4" /> // notifié
                      )*/ : (
                        <CheckCheck className="text-gray-400 w-4 h-4" /> // envoyé
                      )}
                    </div>
                  )}

                  {/* Pour les messages reçus, juste le temps */}
                  {!isMine && (
                    <div className="text-xs mt-1 text-gray-500">{formatTimestamp(msg.created_at || msg.timestamp)} {msg.is_read}</div>
                  )}
                </div>
              );
            })}

          </div>
            
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex flex-col space-y-2">
            
            <div className="mb-2 flex flex-wrap gap-2">
              
              <div className="flex flex-wrap gap-2 mb-2">
                {attachedImages.map((file, index) => (
                  <div key={index} className="relative border p-2 rounded-lg bg-gray-100 flex items-center">
                    <img src={URL.createObjectURL(file)} alt={file.name} className="w-16 h-16 object-cover rounded" />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      onClick={() => setAttachedImages(prev => prev.filter((_, i) => i !== index))}
                    >
                      ×
                    </button>
                  </div>
                ))}

                {attachedFiles.map((file, index) => (
                  <div key={index} className="relative border p-2 rounded-lg bg-gray-100 flex items-center">
                    <span className="text-sm truncate max-w-[100px]">{file.name}</span>
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== index))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button type="button" onClick={handleFileClick} className="p-2 text-gray-500 hover:text-[#e0692d] transition-colors duration-200"><Paperclip size={20} /></button>
              <button type="button" onClick={handleImageClick} className="p-2 text-gray-500 hover:text-[#e0692d] transition-colors duration-200"><Image size={20} /> </button>
              <div className="relative">
                <button
                  ref={emojiButtonRef}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // important pour ne pas fermer directement
                    setShowEmojiPicker(prev => !prev);
                  }}
                  className="text-gray-400 hover:text-[#e0692d]"
                >
                  😊
                </button>

                {showEmojiPicker && (
                  <div
                    ref={emojiPickerRef}
                    className="absolute bottom-12 left-0 z-50 shadow-xl rounded-lg overflow-hidden"
                  >
                    <EmojiPicker
                      onEmojiClick={(emojiData) => setNewMessage(prev => prev + emojiData.emoji)}
                      theme={Theme.LIGHT}
                      height={350}
                      width={300}
                    />
                  </div>
                )}
              </div>
              <input type="text" ref={inputRef} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Écrivez votre message..." className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-transparent"/>
              <button
                type="submit"
                disabled={!newMessage.trim() && attachedFiles.length === 0 && attachedImages.length === 0}
                className="p-2 text-white bg-[#e0692d] rounded-lg hover:bg-[#f07e40] transition-colors duration-200"
              >
                <Send size={20}/>
              </button>
              <input type="file" ref={fileInputRef} multiple accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange}/>
              <input type="file" ref={imageInputRef} accept="image/*" multiple className="hidden" onChange={handleImageChange}/>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- Affichage liste des conversations ---
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-4rem)]">
      <div className="bg-[#e0692d] p-4">
        <h2 className="text-xl font-semibold text-white">Historique des messages</h2>
        <p className="text-white text-opacity-80 text-sm">Vos conversations récentes</p>
      </div>

      <div className="p-4 flex flex-col h-[calc(100%-4rem)]">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Rechercher une conversation..."
            className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e0692d] focus:border-transparent transition-colors duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* ✅ Conteneur scrollable */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-3">
          {loadingConversations ? (
            <p>Chargement des conversations...</p>
          ) : filteredConversations.length === 0 ? (
            <p>Aucune conversation trouvée</p>
          ) : (
            filteredConversations.map((conversation) => (
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
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-900">{conversation.participant.name}</h4>
                      <p className="text-sm text-gray-500">
                        {conversation.participant.role === 'professional' ? 'Professionnel' : 'Utilisateur'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(conversation.lastMessage.timestamp)}
                  </span>
                </div>

                <div className="mt-3 flex items-start">
                  {conversation.lastMessage.sender === conversation.participant.id ? (
                    <UserIcon size={16} className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                  ) : (
                    <MessageSquare size={16} className="mt-1 mr-2 flex-shrink-0 text-orange-400" />
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
                        <CheckCheck size={14} className="text-orange-400 mr-1" />
                        <span className="text-xs text-orange-400">Lu</span>
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
