/**
   * @type {import('next').NextConfig}
   */
const nextConfig = {
  images: {
    loader: 'akamai',
    path: '',
    domains: ['cryptoketsteffany-martins.infura-ipfs.io'],
  },
  assetPrefix: './',
};

export default nextConfig;
