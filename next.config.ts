import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/aws",
        destination: "https://aws.diapc.dev",
        permanent: true
      },
      { source: "/crew", destination: "/committee", permanent: true },
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
