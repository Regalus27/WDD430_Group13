import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '057mycosqxcgnfo1.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
