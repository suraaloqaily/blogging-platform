const nextConfig = {
  output: "export",
  exportTrailingSlash: true,
  basePath: "/blogging-platform",
  assetPrefix: "/blogging-platform/",
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/login": { page: "/login" },
      "/register": { page: "/register" },
    };
  },
};

export default nextConfig;
