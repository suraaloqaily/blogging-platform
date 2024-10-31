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
};
export default nextConfig;
