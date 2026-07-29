"use client";

import React, { useState, useEffect } from "react";

export const TypewriterWrapper = ({
  strings,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
}: {
  strings: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (strings.length === 0) return;

    const currentString = strings[stringIndex % strings.length];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    const speed = isDeleting ? deleteSpeed : typeSpeed;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentString.length) {
          setDisplayText(currentString.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setIsPaused(true);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentString.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setStringIndex((i) => (i + 1) % strings.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, isPaused, stringIndex, strings]);

  return (
    <span>
      {displayText}
      <span className="tw-cursor">_</span>
    </span>
  );
};

export default TypewriterWrapper;
