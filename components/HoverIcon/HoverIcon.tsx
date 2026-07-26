import React from "react";
import CustomSvgIcon from "../Icons/CustomSvgIcon";

interface HoverIconProps {
  className?: string;
  color?: string;
}

const HoverIcon: React.FC<HoverIconProps> = ({
  className = "",
  color = "var(--theme-color)",
}) => {
  return (
    <div className={`flex items-center justify-center transition-all duration-300 ${className}`}>
      <CustomSvgIcon
        fillColor={color}
        className="w-8 h-8 transition-all duration-300 group-hover:scale-110"
      />
    </div>
  );
};

export default HoverIcon;
