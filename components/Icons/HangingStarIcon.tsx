import React from "react";

export interface HangingStarIconProps {
  className?: string;
  color?: string;
}

export const HangingStarIcon: React.FC<HangingStarIconProps> = ({
  className = "w-7 sm:w-8 h-auto",
  color = "#BCBCBC",
}) => {
  return (
    <svg
      width="32"
      height="64"
      viewBox="0 0 32 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Vertical hanging line */}
      <line x1="16" y1="0" x2="16" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Sleek, sharp 4-point star burst outline */}
      <path
        d="M16 40 Q16 48 8 48 Q16 48 16 56 Q16 48 24 48 Q16 48 16 40 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HangingStarIcon;
