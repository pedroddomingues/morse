/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'avatars.githubusercontent.com', 'morse.pedroddomingues.dev'],
  },
}

module.exports = nextConfig
