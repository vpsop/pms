/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.entrepreneur.com'
        }
      ]
    }
  }

export default nextConfig;
