import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";

interface FavoritesButtonProps {
    isFavorited: boolean;
    onToggleFavorite: () => void;
}

// Wrapper component to provide context
export function ToggleTheme() {
    const [currentTheme, setCurrentTheme] = useState(themes.light);
   
    const toggleTheme = () => {
      setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
   
    return (
      <ThemeContext.Provider value={currentTheme}>
        <button onClick={toggleTheme}> Toggle Theme </button>
      </ThemeContext.Provider>
    );
}
   
export function BlankSpace() {
    return (
    <div>
    </div>
    );
}

export function FavoritesButton({ isFavorited, onToggleFavorite }: FavoritesButtonProps) {
    const theme = useContext(ThemeContext);

    return (
      <div>
        <button onClick={onToggleFavorite}
            style={{
                background: theme.background,
                color: theme.foreground,
                }}>
          {isFavorited ? '❤️' : '♡'}
        </button>
      </div>
    );
  }
  