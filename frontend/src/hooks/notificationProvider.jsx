import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext(null);

export const notificationInitialState = { message: "", type: "info" };

export const NotificationProvider = ({ children }) => {
  const [notification, triggerNotification] = useState(notificationInitialState);

  return (
    <NotificationContext.Provider value={{notification, triggerNotification}}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const notificationContext = useContext(NotificationContext);

  if (!notificationContext) {
    throw new Error("NotificationContext must be used within NotificationProvider");
  }

  return notificationContext;
};
