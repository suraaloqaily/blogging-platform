/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/blogging-platform",
  images: {
    unoptimized: true,
  },
  env: {
    backend_base_path: process.env.NEXT_PUBLIC_SERVER_API_URL,
  },
};

export default nextConfig;
