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
        protocol: "https",
        hostname: "rickandmortyapi.com",
        port: "",
        pathname: "/api/character/avatar/**",
      },
    ],
  },
};

export default nextConfig;
