/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/tgen16mgc/tienduongtheportfolio/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.statically.io',
        pathname: '/gh/tgen16mgc/tienduongtheportfolio/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**',
      },
    ],
  },
  // Digital Ocean-friendly configuration
  output: 'standalone',
};

module.exports = nextConfig; 