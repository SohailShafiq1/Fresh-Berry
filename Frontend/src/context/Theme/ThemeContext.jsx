import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const blackTheme = {
  text: "#fff",
};
const whiteTheme = {
  text: "#000",
};

export const ThemeProvider = ({ children }) => {
  const [isBlack, setIsBlack] = useState(0); // Default to white theme

  const toggleTheme = () => {
    setIsBlack((prev) => !prev);
  };

  const theme = isBlack ? blackTheme : whiteTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
