/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logos-world.net",
        port: "",
        pathname: "/wp-content/**",
      },
      {
        protocol: "http",
        hostname: "rickandmortyapi.com",
        port: "",
        pathname: "/api/character/avatar/**",
      },
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        port: "",
        pathname: "/api/character/avatar/**",
      },
    ],
  },
};

module.exports = nextConfig;
