/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.iplt20.com",
        port: "",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
