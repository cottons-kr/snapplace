import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    KAKAO_API_JAVASCRIPT_KEY: process.env.KAKAO_API_JAVASCRIPT_KEY || '',
  },
};

export default nextConfig;
