import React from 'react';
import { Bell, X, CheckCircle2, Clock, XCircle } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'request' | 'approval' | 'rejection';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export default function NotificationCenter({ 
  isOpen, 
  onClose, 
  notifications,
  onMarkAsRead 
}: NotificationCenterProps) {
  if (!isOpen) return null;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'request':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'approval':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'rejection':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 max-h-[32rem] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-800">Notifications</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-y-auto flex-1">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications yet
          </div>
        ) : (
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-indigo-50/50' : ''
                }`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatTime(notification.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-3 border-t">
          <button
            className="w-full py-2 px-3 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            onClick={() => notifications.forEach(n => onMarkAsRead(n.id))}
          >
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
}