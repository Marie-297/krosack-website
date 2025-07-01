import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ['raw.githubusercontent.com'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'html2pdf.js': 'html2pdf.js',
      });
    }

    return config;
  },
};

export default nextConfig;
