/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  tailwind: true,
  postcss: true,
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  watchPaths: () => require('@nx/remix').createWatchPaths(__dirname),
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
