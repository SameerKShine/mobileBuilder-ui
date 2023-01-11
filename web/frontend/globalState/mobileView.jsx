import React, { useContext, useState, createContext } from "react";

const APIContext = createContext();

function ContextMobileView({ children }) {
  const [mobileview, setMobileview] = useState('/assets/images/phoneView/android.png');
  return <APIContext.Provider value={{mobileview, setMobileview}}>{children}</APIContext.Provider>;
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
