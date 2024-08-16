/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-test.yourballistic.com",
      },
    ],
  },
};

export default nextConfig;
