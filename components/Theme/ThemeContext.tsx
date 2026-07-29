"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeColor = "default" | "blue" | "emerald" | "violet" | "amber" | "rose" | "cyan";

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themePalettes: Record<
  ThemeColor,
  { name: string; hex: string; themeColor: string; themeHover: string }
> = {
  default: {
    name: "Emerald",
    hex: "#10b981",
    themeColor: "#10b981",
    themeHover: "#34d399",
  },
  blue: {
    name: "Blue",
    hex: "#5B78F6",
    themeColor: "#5B78F6",
    themeHover: "#7b93f8",
  },
  emerald: {
    name: "Default (Gray)",
    hex: "#9F9F9F",
    themeColor: "#9F9F9F",
    themeHover: "#BCBCBC",
  },
  violet: {
    name: "Violet",
    hex: "#8b5cf6",
    themeColor: "#8b5cf6",
    themeHover: "#a78bfa",
  },
  amber: {
    name: "Amber",
    hex: "#f59e0b",
    themeColor: "#f59e0b",
    themeHover: "#fbbf24",
  },
  rose: {
    name: "Rose",
    hex: "#f43f5e",
    themeColor: "#f43f5e",
    themeHover: "#fb7185",
  },
  cyan: {
    name: "Cyan",
    hex: "#06b6d4",
    themeColor: "#06b6d4",
    themeHover: "#22d3ee",
  },
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeColor, setThemeColorState] = useState<ThemeColor>("default");

  useEffect(() => {
    const savedColor = localStorage.getItem("app_theme_color") as ThemeColor;
    if (savedColor && themePalettes[savedColor]) {
      setThemeColorState(savedColor);
    }
  }, []);

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
    localStorage.setItem("app_theme_color", color);
  };

  useEffect(() => {
    const root = document.documentElement;
    const palette = themePalettes[themeColor];
    if (palette) {
      root.style.setProperty("--theme-color", palette.themeColor);
      root.style.setProperty("--theme-hover-color", palette.themeHover);
    }
    root.classList.add("dark");
  }, [themeColor]);

  return (
    <ThemeContext.Provider
      value={{ themeColor, setThemeColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
