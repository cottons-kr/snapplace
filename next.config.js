const withPWA = require('next-pwa')({
  dest: 'public',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    KAKAO_API_JAVASCRIPT_KEY: process.env.KAKAO_API_JAVASCRIPT_KEY || '',
  },

  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
}

module.exports = withPWA(nextConfig)
