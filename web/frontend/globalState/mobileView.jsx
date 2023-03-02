import React, { useContext, useState, createContext } from "react";

const APIContext = createContext();

function ContextMobileView({ children }) {
  const [getFullscreen, setFullscreen] = useState(false);
  return <APIContext.Provider value={{getFullscreen, setFullscreen}}>{children}</APIContext.Provider>;
}
export default ContextMobileView;

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useMobileview() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
