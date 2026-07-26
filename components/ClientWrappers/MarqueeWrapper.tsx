"use client";

import React from "react";
import Marquee from "react-fast-marquee";

export const MarqueeWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Marquee pauseOnHover={true}>{children}</Marquee>;
};

export default MarqueeWrapper;
