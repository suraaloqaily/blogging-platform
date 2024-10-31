/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/blogging-platform",
  assetPrefix: "/blogging-platform/",
  exportTrailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_SERVER_API_URL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  },
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/login": { page: "/login" },
      "/register": { page: "/register" },
      // Add other paths as necessary
    };
  },
};

export default nextConfig;
