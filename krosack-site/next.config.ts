import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
  if (isServer) {
    config.externals = [...(config.externals || []), 'html2pdf.js'];
  }
  return config;
}
};

export default nextConfig;
