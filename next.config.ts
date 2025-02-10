import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
    webpack(config) {
        return config;
    },
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
    },
};

export default nextConfig;
