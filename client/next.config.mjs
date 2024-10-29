/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",

  images: {
    unoptimized: true, 
  },
   env: {
    NEXT_PUBLIC_SERVER_API_URL: process.env.NEXT_PUBLIC_SERVER_API_URL || 'http://localhost:5000/',
  },
};

export default nextConfig;
