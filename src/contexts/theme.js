import React, { createContext, useContext, useState } from "react";

export const themes = {
  light: {
    color: "#282c32",
    background: "#fff",
  },
  dark: {
    color: "#fff",
    background: "#282c34",
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light,
    );
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
