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
        hostname: "i0.wp.com",
        pathname: "/www.michigandaily.com/wp-content/uploads/**",
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
      {
        source: "/data/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
      // Add specific headers for 404 pages
      {
        source: "/404",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ];
  },

  env: {
    NEXT_PUBLIC_API_URL: "https://api.example.com",
  },
  // trailingSlash: true, // Temporarily disabled to fix static file serving

  // Redirects to prevent duplicate content and handle old URLs
  async redirects() {
    return [
      // Remove trailing slashes to prevent duplicate content
      {
        source: "/:path*//",
        destination: "/:path*",
        permanent: true,
      },

      // Redirect www to non-www (if you prefer non-www)
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.localemichigan.com",
          },
        ],
        destination: "https://localemichigan.com/:path*",
        permanent: true,
      },

      // Redirect old URL patterns to new ones
      {
        source: "/city/:slug",
        destination: "/cities/:slug",
        permanent: true,
      },
      {
        source: "/lake/:slug",
        destination: "/lakes/:slug",
        permanent: true,
      },
      {
        source: "/park/:slug",
        destination: "/parks/:slug",
        permanent: true,
      },
      {
        source: "/lighthouse/:slug",
        destination: "/lighthouses/:slug",
        permanent: true,
      },

      // Redirect old API endpoints if they exist
      {
        source: "/api/city/:slug",
        destination: "/api/cities/:slug",
        permanent: true,
      },

      // Redirect common misspellings
      {
        source: "/lighthouses",
        destination: "/lighthouses",
        permanent: false,
      },
      {
        source: "/museums",
        destination: "/museum",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
