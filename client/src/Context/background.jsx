// context/ThemeContext.js
import { createContext, useContext, useEffect, useState } from "react";

// 1. Create context
const ThemeContext = createContext();

// 2. Context Provider component
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("mode");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Custom hook for consuming
export const useBg = () => useContext(ThemeContext);
