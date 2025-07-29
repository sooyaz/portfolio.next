import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true       // 개발시 버그발견 도움 위해 의도적 재랜더 2회(개발에만 적용됨)
  /* config options here */
};

export default nextConfig;
