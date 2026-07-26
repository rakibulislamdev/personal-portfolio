"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme, themePalettes, ThemeColor } from "@/components/Theme/ThemeContext";
import { Sun, Moon, Palette } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const { themeColor, setThemeColor, isDark, setIsDark } = useTheme();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Works", href: "/works" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full relative z-50 py-6 text-zinc-900 dark:text-white max-w-7xl mx-auto px-4 sm:px-8">
      <div className="flex justify-between items-center px-3 lg:px-0">
        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-900 dark:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-7 h-7 stroke-current"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Brand Logo */}
        <Link href="/" className="text-2xl font-semibold flex items-center gap-1 group">
          <span>Rakibul Islam</span>
          <span className="w-2 h-2 rounded-full transition-colors duration-300" style={{ backgroundColor: "var(--theme-color)" }} />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-6 text-zinc-500 dark:text-[#676767] font-semibold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={isActive ? { color: "var(--theme-color)" } : undefined}
                    className={
                      isActive
                        ? "font-bold transition-colors duration-300"
                        : "hover:text-[var(--theme-color)] transition-colors duration-300"
                    }
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Action Buttons: Theme Picker + Dark/Light Toggle + Download Resume */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme Color Picker Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2.5 rounded-full bg-zinc-200 dark:bg-[#323232] hover:bg-zinc-300 dark:hover:bg-[#444] text-zinc-900 dark:text-white transition flex items-center justify-center shadow-sm"
              title="Change Accent Color"
            >
              <Palette className="w-5 h-5 transition-colors duration-300" style={{ color: "var(--theme-color)" }} />
            </button>

            {showColorPicker && (
              <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-[#1f1e1e] border border-zinc-200 dark:border-neutral-800 rounded-2xl p-3 shadow-2xl space-y-2 z-50 animate-in fade-in zoom-in-95">
                <span className="text-xs font-semibold text-zinc-500 dark:text-neutral-400 block px-1">Select Accent Color</span>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(themePalettes) as ThemeColor[]).map((key) => {
                    const palette = themePalettes[key];
                    const isSelected = themeColor === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setThemeColor(key);
                          setShowColorPicker(false);
                        }}
                        className={`w-full aspect-square rounded-full flex items-center justify-center transition ${
                          isSelected ? "ring-2 ring-zinc-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-[#1f1e1e]" : "hover:scale-110"
                        }`}
                        style={{ backgroundColor: palette.hex }}
                        title={palette.name}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sun / Moon Dark-Light Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-full bg-zinc-200 dark:bg-[#323232] hover:bg-zinc-300 dark:hover:bg-[#444] text-zinc-900 dark:text-white transition flex items-center justify-center shadow-sm"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-blue-500" />}
          </button>

          {/* Download Resume Button */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://drive.google.com/uc?export=download&id=1G9ZeSIrAol1ZW1VqCFbrt4SpNG4rPXCj"
            className="relative inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-zinc-900 dark:bg-[#323232] rounded-full hover:bg-zinc-800 dark:hover:bg-white group"
          >
            <span
              className="w-60 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"
              style={{ backgroundColor: "var(--theme-color)" }}
            />
            <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out">
              Download Resume
            </span>
          </a>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-[#161616] border-t border-zinc-200 dark:border-neutral-800 p-6 flex flex-col gap-4 shadow-xl">
          <ul className="flex flex-col gap-4 text-zinc-500 dark:text-[#676767] font-semibold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={isActive ? { color: "var(--theme-color)" } : undefined}
                    className={
                      isActive
                        ? "block py-1 font-bold"
                        : "hover:text-[var(--theme-color)] block py-1"
                    }
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-neutral-800">
            <span className="text-sm text-zinc-500 dark:text-neutral-400 font-medium">Dark / Light Mode</span>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-full bg-zinc-200 dark:bg-[#323232] text-zinc-900 dark:text-white flex items-center gap-2"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-500" />}
              <span className="text-xs font-medium">{isDark ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>

          <div className="pt-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://drive.google.com/uc?export=download&id=1G9ZeSIrAol1ZW1VqCFbrt4SpNG4rPXCj"
              className="relative inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-zinc-900 dark:bg-[#323232] rounded-full hover:bg-zinc-800 dark:hover:bg-white group"
            >
              <span
                className="w-60 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-in-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"
                style={{ backgroundColor: "var(--theme-color)" }}
              />
              <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out">
                Download Resume
              </span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
