import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.commercetools.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_COMMERCETOOLS_PROJECT_KEY: process.env.NEXT_PUBLIC_COMMERCETOOLS_PROJECT_KEY,
    NEXT_PUBLIC_COMMERCETOOLS_CLIENT_ID: process.env.NEXT_PUBLIC_COMMERCETOOLS_CLIENT_ID,
    COMMERCETOOLS_CLIENT_SECRET: process.env.COMMERCETOOLS_CLIENT_SECRET,
    COMMERCETOOLS_API_URL: process.env.COMMERCETOOLS_API_URL,
    COMMERCETOOLS_AUTH_URL: process.env.COMMERCETOOLS_AUTH_URL,
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
};

export default nextConfig;
