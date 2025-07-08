import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media2.metrotimes.com",
        pathname: "/metrotimes/imager/u/magnum/**",
      },
      {
        protocol: "https",
        hostname: "www.mlive.com",
        pathname: "/resizer/v2/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: "https://api.example.com",
  },
  trailingSlash: true,
};

export default nextConfig;
