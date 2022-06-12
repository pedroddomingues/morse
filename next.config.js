/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'avatars.githubusercontent.com', 'morse.pedroddomingues.dev'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
