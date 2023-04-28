/** @type {import('next').NextConfig} */
const withGraphql = require('next-plugin-graphql');

const nextConfig = {
  experimental: {
    turbo: {
      loaders: {
        '.graphql': ['graphql-tag/loader']
      }
    },
    appDir: true,
    swcFileReading: false,
  },
  reactStrictMode: true,
};

module.exports = withGraphql(nextConfig);
