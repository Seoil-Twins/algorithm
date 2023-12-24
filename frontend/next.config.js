/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "styles/_variables.scss";`,
  },
};

export default nextConfig;
