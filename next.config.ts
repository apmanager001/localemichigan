import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media2.metrotimes.com",
        pathname: "/metrotimes/imager/u/magnum/**",
      },
      {
        protocol: "https",
        hostname: "media1.metrotimes.com",
        pathname: "/metrotimes/imager/u/magnum/**",
      },
      {
        protocol: "https",
        hostname: "www.mlive.com",
        pathname: "/resizer/v2/**",
      },
      {
        protocol: "https",
        hostname: "ewscripps.brightspotcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.wlns.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "michiganchronicle.com",
        pathname: "/**",
      },
    ],
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ["lucide-react", "react-social-icons"],
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Minification optimizations
    if (!dev && !isServer) {
      config.optimization.minimize = true;
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            enforce: true,
          },
        },
      };
    }

    return config;
  },

  // Headers for caching and compression
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  env: {
    NEXT_PUBLIC_API_URL: "https://api.example.com",
  },
  trailingSlash: true,
};

export default nextConfig;
