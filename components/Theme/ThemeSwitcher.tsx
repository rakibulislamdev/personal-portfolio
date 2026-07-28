"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, themePalettes, ThemeColor } from "./ThemeContext";
import { Palette, X } from "lucide-react";

export const ThemeSwitcher = () => {
  const { themeColor, setThemeColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-zinc-800/90 border border-zinc-700 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
        title="Theme Accent Color"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Palette className="w-5 h-5" />}
      </button>

      {/* Popover Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-2xl p-4 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-sm font-semibold text-zinc-200">Accent Color</span>
          </div>

          <div>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(themePalettes) as ThemeColor[]).map((key) => {
                const colorObj = themePalettes[key];
                const isSelected = themeColor === key;
                return (
                  <button
                    key={key}
                    onClick={() => setThemeColor(key)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? "border-white bg-zinc-800 text-white"
                        : "border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: colorObj.hex }}
                    />
                    {colorObj.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
