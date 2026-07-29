"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useTheme, themePalettes, ThemeColor } from "@/components/Theme/ThemeContext";
import { Palette, Menu, Download } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const { themeColor, setThemeColor } = useTheme();
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.resumeUrl) {
          setResumeUrl(data.resumeUrl);
        }
      })
      .catch(() => { });
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Works", href: "/works" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full relative z-50 py-6 text-white max-w-7xl mx-auto px-4 sm:px-8">
      <div className="flex justify-between items-center px-3 lg:px-0">
        {/* Mobile Hamburger Button with ShadCN Sheet */}
        <div className="lg:hidden flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <button
                  className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white flex items-center justify-center hover:bg-zinc-800 transition cursor-pointer"
                  aria-label="Toggle menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              }
            />
            <SheetContent side="left" className="bg-[#121212] border-r border-zinc-800 w-[80vw] max-w-xs p-6 flex flex-col justify-between">
              <div>
                <SheetHeader className="mb-8 border-b border-zinc-800 pb-4">
                  <SheetTitle className="text-xl font-semibold flex items-center gap-2 text-white">
                    <span>Rakibul Islam</span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--theme-color)" }} />
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Links */}
                <ul className="flex flex-col gap-4 font-medium text-base">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <SheetClose
                          render={
                            <Link
                              href={link.href}
                              style={
                                isActive
                                  ? { color: themeColor === "emerald" ? "#FFFFFF" : "var(--theme-color)" }
                                  : undefined
                              }
                              className={`block py-2 text-lg transition-colors ${
                                isActive ? "font-bold" : "text-zinc-400 hover:text-white font-medium"
                              }`}
                            >
                              {link.name}
                            </Link>
                          }
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Mobile Bottom Actions */}
              <div className="space-y-6 pt-6 border-t border-zinc-800">
                {/* Accent Color Chooser in Mobile Menu */}
                <div>
                  <span className="text-xs font-semibold text-zinc-400 block mb-3">Accent Color</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {(Object.keys(themePalettes) as ThemeColor[]).map((key) => {
                      const palette = themePalettes[key];
                      const isSelected = themeColor === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setThemeColor(key)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform cursor-pointer ${
                            isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-[#121212] scale-110" : "hover:scale-105"
                          }`}
                          style={{ backgroundColor: palette.hex }}
                          title={palette.name}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Download Resume Button */}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/api/resume/download"
                  download="Rakibul Islam.pdf"
                  className="w-full relative inline-flex items-center justify-center gap-2 px-6 py-3 overflow-hidden font-medium text-white transition-all bg-zinc-800 rounded-full hover:bg-zinc-700 group"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download Resume</span>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Brand Logo */}
        <Link href="/" className="text-2xl font-semibold flex items-center gap-1 group text-white">
          <span>Rakibul Islam</span>
          <span className="w-2 h-2 rounded-full transition-colors duration-300" style={{ backgroundColor: "var(--theme-color)" }} />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-8 font-semibold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className="py-1">
                  <Link
                    href={link.href}
                    style={
                      isActive
                        ? { color: themeColor === "emerald" ? "#FFFFFF" : "var(--theme-color)" }
                        : undefined
                    }
                    className={`text-base transition-colors duration-300 ${
                      isActive
                        ? "font-bold"
                        : "text-zinc-400 hover:text-white font-medium"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Action Buttons: Accent Theme Picker + Download Resume */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme Color Picker Dropdown */}
          <div ref={colorPickerRef} className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2.5 rounded-full bg-[#323232] hover:bg-[#444] text-white transition flex items-center justify-center shadow-sm cursor-pointer"
              title="Change Accent Color"
            >
              <Palette className="w-5 h-5 transition-colors duration-300" style={{ color: "var(--theme-color)" }} />
            </button>

            {showColorPicker && (
              <div className="absolute right-0 mt-3 w-52 bg-[#1f1e1e] border border-neutral-800 rounded-2xl p-3 shadow-2xl space-y-2 z-50 animate-in fade-in zoom-in-95">
                <span className="text-xs font-semibold text-neutral-400 block px-1">Select Accent Color</span>
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
                        className={`w-full aspect-square rounded-full flex items-center justify-center transition cursor-pointer ${isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-[#1f1e1e]" : "hover:scale-110"
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

          {/* Download Resume Button */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/api/resume/download"
            download="Rakibul Islam.pdf"
            className="relative inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-[#323232] text-white rounded-full hover:bg-white group"
          >
            <span
              className="w-60 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"
              style={{ backgroundColor: "var(--theme-color)" }}
            />
            <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-zinc-900">
              Download Resume
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
