/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,        // React strict mode enabled
  swcMinify: true,              // Use SWC compiler for faster builds and minification

  experimental: {
    serverActions: {}           // Correct format: empty object instead of boolean
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',          // Allow all remote images (change if you want to restrict)
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,    // Prevent ESLint warnings from breaking the build
  },

  compiler: {
    styledComponents: true,      // If using styled-components
  },
};

module.exports = nextConfig;
