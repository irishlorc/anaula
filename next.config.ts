import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.STATIC_PREVIEW
    ? { output: "export" as const, assetPrefix: "./", images: { unoptimized: true } }
    : {}),
  ...(process.env.STATIC_PREVIEW ? {} : { cacheComponents: true, partialPrefetching: true }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
