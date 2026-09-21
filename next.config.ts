import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray package-lock.json in the user's home
  // directory otherwise makes Next.js warn about an inferred root above
  // the project (and it ignores that lockfile).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
