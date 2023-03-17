/** @type {import('next').NextConfig} */
const withGraphql = require('next-plugin-graphql');

const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
    enableUndici: true,
    swcFileReading: false
  },
  reactStrictMode: true,
};

module.exports = withGraphql(nextConfig);
