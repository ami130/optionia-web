// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "optionia-app.onrender.com",
      },
      {
        protocol: "http",
        hostname: "optionia-app.onrender.com",
      },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Remove or fix the experimental options causing issues
  experimental: {
    // Remove optimizeCss as it requires critters dependency
    optimizePackageImports: ["lucide-react"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       { protocol: "https", hostname: "optionia-backend.onrender.com" },
//       { protocol: "http", hostname: "optionia-backend.onrender.com" },
//     ],
//   },
//   async headers() {
//     return [
//       {
//         source: "/:all*(png|jpg|jpeg|gif|svg|webp)",
//         headers: [
//           {
//             key: "Cache-Control",
//             value: "public, max-age=31536000, immutable",
//           },
//         ],
//       },
//     ];
//   },
// };
// module.exports = nextConfig;
