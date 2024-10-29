self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [
    "static/chunks/webpack.js",
    "static/chunks/main-app.js"
  ],
  "rootMainFilesTree": {},
  "pages": {
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/blog/[id]": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/blog/[id].js"
    ],
    "/create-blog": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/create-blog.js"
    ],
    "/edit-blog/[id]": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/edit-blog/[id].js"
    ],
    "/homepage": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/homepage.js"
    ],
    "/login": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/login.js"
    ],
    "/profile": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/profile.js"
    ],
    "/register": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/register.js"
    ],
    "/your-blogs": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/your-blogs.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];