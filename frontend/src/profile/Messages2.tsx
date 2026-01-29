import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { mapUserDataToUserModel, mapServicesDataToUserModel } from '../utils/mapper';

interface MessagesProps {
  conversations: Conversation[];
  user: User;
}

const Messages: React.FC<MessagesProps> = ({ user, conversations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const filteredConversations = conversations.filter(
    conversation => conversation.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const routeParams = useParams<{ id?: string }>();
  const id = routeParams.id || user?.id; 
  console.log("ID dans messages.tsx =", user);

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
  const token = localStorage.getItem('token');
    if (!token) {
      alert('Token non trouvé. Veuillez vous reconnecter.');
      return;
    }
    console.log("Token dans messages.tsx =", token);

  // Envoyer un message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const res = await fetch('/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          conversationId: selectedConversation.id,
          sender: user.role,
          content: newMessage
        })
      });
      if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
      const savedMessage = await res.json();
      setMessages(prev => [...prev, savedMessage]);
      setNewMessage('');
    } catch (err) {
      console.error('Erreur envoi message', err);
    }
  };

  /*const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    // In a real app, this would send the message to the backend
    console.log('Sending message:', {
      conversationId: selectedConversation.id,
      content: newMessage,
      timestamp: new Date().toISOString()
    });

    setNewMessage('');
  };*/
  
  if (selectedConversation) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-2rem)]">
        {/* Conversation Header */}
        <div className="bg-[#e0692d] p-4">
          <div className="flex items-center">
            <button 
              onClick={() => setSelectedConversation(null)}
              className="text-white mr-4 hover:bg-[#f07e40] p-2 rounded-full transition-colors duration-200"
            >
              <ArrowLeft size={20} />
            </button>
            <img 
              src={selectedConversation.participant.avatar} 
              alt={selectedConversation.participant.name}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold text-white">{selectedConversation.participant.name}</h2>
              <p className="text-white text-opacity-80 text-sm">
                {selectedConversation.participant.role === 'professional' ? 'Professionnel' : 'Utilisateur'}
              </p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex flex-col h-[calc(100%-180px)] bg-gray-50">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Example messages - In a real app, these would come from the backend */}
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-3 max-w-[70%] shadow">
                <p className="text-gray-800">Bonjour, je souhaiterais avoir un devis pour la réparation de ma plomberie.</p>
                <span className="text-xs text-gray-500 mt-1 block">10:30</span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-[#e0692d] text-white rounded-lg p-3 max-w-[70%] shadow">
                <p>Bien sûr, je peux vous aider. Pouvez-vous me décrire le problème ?</p>
                <span className="text-xs text-white text-opacity-80 mt-1 block">10:32</span>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
            <div className="flex items-center space-x-2">
              <button 
                type="button"
                className="p-2 text-gray-500 hover:text-[#e0692d] transition-colors duration-200"
              >
                <Paperclip size={20} />
              </button>
              <button 
                type="button"
                className="p-2 text-gray-500 hover:text-[#e0692d] transition-colors duration-200"
              >
                <Image size={20} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
              />
              <button 
                type="submit"
                className="p-2 text-white bg-[#e0692d] rounded-lg hover:bg-[#f07e40] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newMessage.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#e0692d] p-4">
        <h2 className="text-xl font-semibold text-white">Historique des messages</h2>
        <p className="text-white text-opacity-80 text-sm">Vos conversations récentes</p>
      </div>
      
      <div className="p-4">
        {/* Search Input */}
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
        
        {/* Conversations List */}
        <div className="space-y-3">
          {filteredConversations.length > 0 ? (
            filteredConversations.map(conversation => (
              <div 
                key={conversation.id}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => setSelectedConversation(conversation)}
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
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <MessageSquare size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune conversation trouvée</h3>
              <p className="text-gray-500">
                {searchQuery ? 
                  `Aucun résultat pour "${searchQuery}"` : 
                  "Vous n'avez pas encore de messages"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;