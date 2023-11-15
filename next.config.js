const withNextIntl = require("next-intl/plugin")("./src/libs/router/i18n.ts");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl(
  withPWA({
    reactStrictMode: true,
    swcMinify: true,
    distDir: "out/build",
    experimental: {
      webpackBuildWorker: true,
    },
  }),
);

module.exports = nextConfig;
