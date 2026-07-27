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
        const userAgent = navigator.userAgent;
        let device = "Desktop / Browser";
        if (/mobile/i.test(userAgent)) device = "Mobile / Phone";
        if (/tablet|ipad/i.test(userAgent)) device = "Tablet";

        // Fetch IP & Geo information securely
        const ipRes = await fetch("https://ipapi.co/json/").catch(() => null);
        let geoData = {
          ip: "127.0.0.1",
          country_name: "Bangladesh",
          city: "Dhaka",
          country_code: "BD",
        };

        if (ipRes && ipRes.ok) {
          geoData = await ipRes.json();
        }

        // Convert country code to emoji flag
        const getFlagEmoji = (countryCode: string) => {
          if (!countryCode || countryCode.length !== 2) return "🌐";
          const codePoints = countryCode
            .toUpperCase()
            .split("")
            .map((char) => 127397 + char.charCodeAt(0));
          return String.fromCodePoint(...codePoints);
        };

        const flag = getFlagEmoji(geoData.country_code);

        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ip: geoData.ip,
            country: geoData.country_name || "Bangladesh",
            city: geoData.city || "Dhaka",
            flag,
            page: pathname,
            device: `${device} (${navigator.language || "en"})`,
          }),
        });
      } catch (err) {
        console.error("Error logging visitor:", err);
      }
    };

    // Delay 1 second to avoid blocking main thread render
    const timer = setTimeout(() => {
      logVisitor();
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
