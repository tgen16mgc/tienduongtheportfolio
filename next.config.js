/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/tgen16mgc/tienduongtheportfolio/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/tgen16mgc/tienduongtheportfolio/**',
      },
    ],
  },
  // Digital Ocean-friendly configuration
  output: 'standalone',
};

module.exports = nextConfig; 