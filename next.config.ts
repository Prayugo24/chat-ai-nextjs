import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {   
    domains: ['creatie.ai', 'ai-public.creatie.ai','lh3.googleusercontent.com'], 
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
      stream: false,
      zlib: false,
      buffer: false,
    };
    return config;
  },
};

export default nextConfig;
