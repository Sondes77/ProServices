import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { Toaster, toast } from 'sonner';

// Only create Supabase client if environment variables are available
const supabase = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
  ? createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    )
  : null;

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'admin';
  created_at: string;
}

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!supabase) return;

    // Subscribe to new messages
    const channel = supabase
      .channel('chat_messages')
      .on('INSERT', { event: '*', schema: 'public', table: 'messages' }, 
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      if (supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (!supabase) {
      toast.error('Service de chat non disponible');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            content: message.trim(),
            sender: 'user'
          }
        ])
        .select();

      if (error) throw error;

      // Notify admin about new message
      await supabase.from('notifications').insert([
        {
          type: 'new_message',
          content: message.trim(),
          read: false
        }
      ]);

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Erreur lors de l\'envoi du message');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#e0692d] text-white p-4 rounded-full shadow-lg hover:bg-[#f07e40] transition-colors duration-200"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-xl transition-all duration-200 ${
        isMinimized ? 'w-72' : 'w-96'
      }`}
    >
      {/* Chat Header */}
      <div className="bg-[#e0692d] text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Chat en direct</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-[#f07e40] rounded"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-[#f07e40] rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      {!isMinimized && (
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user'
                    ? 'bg-[#e0692d] text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{msg.content}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
          />
          <button
            type="submit"
            className="p-2 bg-[#e0692d] text-white rounded-lg hover:bg-[#f07e40] transition-colors duration-200"
          >
            <Send size={20} />
          </button>
        </div>
      </form>

      <Toaster position="top-right" />
    </div>
  );
};

export default LiveChat;