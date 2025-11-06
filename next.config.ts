const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "optionia-backend.onrender.com", // Allows images from any HTTPS domain
        // hostname: "**", // Allows images from any HTTPS domain
      },
    ],
  },
};

module.exports = nextConfig;
