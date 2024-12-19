"use client";
import React, { useState } from "react";
import "./index.css"; // Add styles as per your theme

type NotificationProps = {
  message: string;
  status: "success" | "error" | "warning";
};

let notify: (message: string, status: "success" | "error" | "warning") => void;

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  // Global trigger function
  notify = (message, status) => {
    setNotifications((prev) => [...prev, { message, status }]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1)); // Remove after 10 seconds
    }, 10000);
  };

  const removeNotification = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='notification-container'>
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`notification ${notification.status}`}
          onClick={() => removeNotification(index)} // Close on click
        >
          <span className='notification-message'>{notification.message}</span>
          <span className='notification-close'>&times;</span>
        </div>
      ))}
    </div>
  );
};

export { notify };
export default Notification;
