/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sofifa.net",
        port: "",
        pathname: "/players/**",
      },
    ],
  },
};

export default nextConfig;
