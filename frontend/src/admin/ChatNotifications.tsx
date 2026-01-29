import React, { useState, useEffect } from 'react';
import { Bell, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: string;
  content: string;
  read: boolean;
  created_at: string;
}

const ChatNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    loadNotifications();

    // Optional: polling every 30 seconds
    const interval = setInterval(() => {
      loadNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/notifications'); // ← ton API MySQL
      const data = await res.json();
      setNotifications(data);

      // Affiche uniquement les nouvelles notifications
      const unread = data.filter((n: Notification) => !n.read);
      unread.forEach(n =>
        toast.message('Nouveau message', {
          description: n.content,
          icon: <MessageSquare className="text-[#e0692d]" />,
        })
      );
    } catch (error) {
      console.error('Erreur lors du chargement des notifications:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
        method: 'PUT',
      });

      setNotifications(prev =>
        prev.map(notif =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:text-[#e0692d] transition-colors duration-200"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          <div className="p-4 bg-[#e0692d] text-white">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-gray-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-[#e0692d] mt-1" />
                    <div className="ml-3">
                      <p className="text-sm text-gray-800">{notification.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                Aucune notification
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatNotifications;
