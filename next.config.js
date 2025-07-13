/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/mental-health-portal',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
