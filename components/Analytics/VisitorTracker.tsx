"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Ignore tracking for dashboard admin routes
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/login")) {
      return;
    }

    const logVisitor = async () => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page: pathname,
          }),
        });
      } catch (err) {
        console.error("Error logging visitor:", err);
      }
    };

    // Send analytics after page load
    const timer = setTimeout(() => {
      logVisitor();
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
