/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.scdn.co'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sotd',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
