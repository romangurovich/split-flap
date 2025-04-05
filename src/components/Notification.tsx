// src/components/Notification.tsx
import React from 'react';

interface NotificationProps {
  message: string | null;
  type?: 'success' | 'error';
}

const Notification: React.FC<NotificationProps> = ({ message, type = 'success' }) => {
  if (!message) return null;

  const baseClasses = "mt-2";
  const typeClasses = type === 'success' 
    ? "text-green-500" 
    : "text-red-500";

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      {message}
    </div>
  );
};

export default Notification;