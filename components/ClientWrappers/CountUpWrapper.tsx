"use client";

import React, { useEffect, useRef, useState } from "react";

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

            // Custom Cubic-Bezier (Ease-Out Expo) for ultra-smooth premium feel
            const easeOutExpo =
              progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.floor(easeOutExpo * end);

            // Pad numbers for a slick digital odometer look when counting
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span
      ref={ref}
      aria-label={`${end}${suffix}`}
      className={`inline-flex items-baseline font-black tracking-tight transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-4"
      }`}
    >
      {/* Hidden static text for SEO crawlers and screen readers */}
      <span className="sr-only">
        {end}
        {suffix}
      </span>

      {/* Visual animated text for clients */}
      <span
        aria-hidden="true"
        className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent font-extrabold drop-shadow-sm"
      >
        {displayValue}
      </span>
      <span
        aria-hidden="true"
        className="ml-0.5 text-2xl sm:text-3xl font-extrabold transition-colors duration-300"
        style={{ color: "var(--theme-color)" }}
      >
        {suffix}
      </span>
    </span>
  );
};

export default CountUpWrapper;
