import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // typedRoutes: true,
  reactCompiler: true,
  experimental: {
    browserDebugInfoInTerminal: {
      showSourceLocation: true
    }
  },
  images: {
    qualities: [25, 50, 80, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ]
  },
};

export default nextConfig;
