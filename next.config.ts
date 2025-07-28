import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Any request to /api/* on frontend
        destination: "https://primebackend.onrender.com/api/:path*", // Goes to your backend
      },
    ];
  },
};

export default nextConfig;