import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",   // 순수 정적 HTML 생성 → Vercel 서버리스 불필요
  trailingSlash: true,
};

export default nextConfig;
