/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US'],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
