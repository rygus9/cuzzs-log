/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    images: {
      allowFutureImage: true,
    },
  },

  images: {
    deviceSizes: [640, 1080, 1440, 2048],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
