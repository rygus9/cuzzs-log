// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
// module.exports = withBundleAnalyzer({});
const withTM = require("next-transpile-modules")(["react-syntax-highlighter"]); // pass the modules you would like to see transpiled
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [withBundleAnalyzer, withTM];
  return plugins.reduce((acc, plugin) => plugin(acc), { ...defaultConfig });
};
