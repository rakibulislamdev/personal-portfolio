"use client";

import React from "react";
import Typewriter from "typewriter-effect";

export const TypewriterWrapper = ({ strings }: { strings: string[] }) => {
  return (
    <>
      {/* Hidden static fallback for SEO crawlers */}
      <span className="sr-only">{strings.join(" ")}</span>
      
      {/* Interactive animated text for visitors */}
      <span aria-hidden="true">
        <Typewriter
          options={{
            strings,
            autoStart: true,
            loop: true,
            cursor: "_",
          }}
        />
      </span>
    </>
  );
};

export default TypewriterWrapper;
