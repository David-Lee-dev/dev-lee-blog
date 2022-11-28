/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['s3.us-west-2.amazonaws.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`, // prependData 옵션 추가
  },
};

module.exports = nextConfig;
