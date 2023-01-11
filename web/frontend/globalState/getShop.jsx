import React, { useContext, useState, createContext } from "react";

const APIContext = createContext();

function ContextProvider({ children }) {
  const [getShop, setGetShop] = useState(
    new URL(location).searchParams.get("shop")
  );
  return <APIContext.Provider value={{getShop}}>{children}</APIContext.Provider>;
}
export default ContextProvider;

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
