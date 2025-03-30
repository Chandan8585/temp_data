import React, { createContext, useContext, useState } from 'react';

// Create the context
const SidebarContext = createContext();

// Custom hook to use the sidebar context
export const useSidebar = () => useContext(SidebarContext);

// Provider component
export const SidebarProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(prev => !prev);
  };
  return (
    <SidebarContext.Provider value={{ expanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};