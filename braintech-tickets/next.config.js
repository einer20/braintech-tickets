/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx"],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },

  publicRuntimeConfig: {
    NEXT_PUBLIC_MAX_ATTACHMENT_SIZE : process.env.NEXT_PUBLIC_MAX_ATTACHMENT_SIZE
  }
}

module.exports = nextConfig
