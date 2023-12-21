/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd3ozihag9834pq.cloudfront.net',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
};

module.exports = nextConfig;
