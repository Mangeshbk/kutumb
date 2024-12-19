import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["media.crafto.app"],
    unoptimized: true,
  },
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
