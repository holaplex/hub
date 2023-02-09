/** @type {import('next').NextConfig} */
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
  async rewrites() {
    return [
      {
        source: '/organization',
        destination: '/organization/members',
      },
    ]
  },
};

module.exports = nextConfig;
