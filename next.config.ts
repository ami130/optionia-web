/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "optionia-backend.onrender.com",
      },
      {
        protocol: "http", 
        hostname: "optionia-backend.onrender.com",
      },
    ],
  },
};

module.exports = nextConfig;