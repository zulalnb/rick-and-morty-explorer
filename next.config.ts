import type { NextConfig } from "next";
import packageJson from "./package.json";
const nextVersion = packageJson.dependencies.next;

const nextConfig: NextConfig = {
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_NEXT_VERSION: nextVersion,
  },
  images: {
    remotePatterns: [
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
  async redirects() {
    return [
      { source: "/page/1", destination: "/", permanent: true },
      {
        source: "/locations/:id/characters/page/1",
        has: [{ type: "query", key: "status" }],
        destination: "/locations/:id/characters?status=:status",
        permanent: true,
      },
      {
        source: "/locations/:id/characters/page/1",
        destination: "/locations/:id/characters",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
