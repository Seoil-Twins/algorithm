/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "styles/_variables.scss";@import "styles/_mixin.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.birds.cornell.edu",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  // 엄격 모드로 인해 useEffect가 2번 실행 (1번만 실행하게 할라면 밑에 주석을 푸셈)
  reactStrictMode: false,
};

export default nextConfig;
