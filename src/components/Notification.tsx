// src/components/Notification.tsx
import React from 'react';

interface NotificationProps {
  message: string | null;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className={`mt-2 ${message.includes('already') ? 'text-red-500' : 'text-green-500'}`}>
      {message}
    </div>
  );
};

export default Notification;