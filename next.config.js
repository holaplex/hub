/** @type {import('next').NextConfig} */

const withGraphql = require('next-plugin-graphql');

const nextConfig = {
  output: 'standalone',
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US'],
  },
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
};

module.exports = withGraphql(nextConfig);
