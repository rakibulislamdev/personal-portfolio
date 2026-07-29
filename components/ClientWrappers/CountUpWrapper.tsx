"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CountUpWrapperProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const CountUpWrapper: React.FC<CountUpWrapperProps> = ({
  end,
  duration = 2.4,
  suffix = "+",
}) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  // Count-up animation with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setIsVisible(true);

          const startTime = performance.now();
          const durationMs = duration * 1000;

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / durationMs, 1);

            // Ease-Out Expo for ultra-smooth premium feel
            const easeOutExpo =
              progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.floor(easeOutExpo * end);

            const formatted =
              end >= 100
                ? currentCount.toString().padStart(3, "0")
                : currentCount.toString();

            setDisplayValue(formatted);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(end.toString());
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span
      ref={ref}
      aria-label={`${end}${suffix}`}
      className={cn(
        "inline-flex items-baseline font-black tracking-tight whitespace-nowrap transition-all duration-700",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-4"
      )}
    >
      {/* Hidden static text for SEO & screen readers */}
      <span className="sr-only">
        {end}
        {suffix}
      </span>

      {/* Gradient number — works on all screens with standard CSS support */}
      <span
        aria-hidden="true"
        className={cn("gradient-number font-extrabold")}
      >
        {displayValue}
      </span>

      {/* Suffix (+ sign) */}
      <span
        aria-hidden="true"
        className={cn(
          "ml-0.5 text-2xl sm:text-3xl font-extrabold transition-colors duration-300"
        )}
        style={{ color: "var(--theme-color)" }}
      >
        {suffix}
      </span>
    </span>
  );
};

export default CountUpWrapper;
