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
    enableUndici: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/organization',
        destination: '/organization/members',
      },
      {
        source: '/projects/:project',
        destination: '/projects/:project/drops',
      },
    ];
  },
};

module.exports = withGraphql(nextConfig);
