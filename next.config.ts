/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // optional, depending on your Next.js version
  },
  images: {
    domains: ['assets.coingecko.com'], // allows displaying CoinGecko images
  },
}

module.exports = nextConfig
