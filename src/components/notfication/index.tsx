"use client";
import React, { useEffect } from "react";
import "./index.css";

interface NotificationProps {
  message: string;
  status: "success" | "error" | "warning";
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  status,
  duration = 10000,
}) => {
  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`notification notification-${status}`}>
      <span>{message}</span>
      <button className='close-button' onClick={() => setVisible(false)}>
        ×
      </button>
    </div>
  );
};

export default Notification;
