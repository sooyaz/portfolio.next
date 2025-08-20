import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,       // 개발시 버그발견 도움 위해 의도적 재랜더 2회(개발에만 적용됨)
  // 빌드시 린트 에러 해결
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
};

export default nextConfig;
