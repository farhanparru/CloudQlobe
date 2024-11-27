/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore TypeScript errors during the build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during the build
    ignoreDuringBuilds: true,
  },
  swcMinify: false, // Set SWC minification to false
};

export default nextConfig;
