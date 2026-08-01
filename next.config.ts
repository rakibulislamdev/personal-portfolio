import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: false,
  turbopack: {
    root: __dirname,
  },
  images: {
    qualities: [75, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
