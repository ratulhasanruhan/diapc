import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/aws",
        destination: "https://aws.diapc.dev",
        permanent: true
      },
      {
        source: "/wings/aws",
        destination: "https://aws.diapc.dev",
        permanent: true
      }
    ];
  },
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
