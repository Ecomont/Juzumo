module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com'], // Add your image domains here
  },
  env: {
    CUSTOM_ENV_VARIABLE: process.env.CUSTOM_ENV_VARIABLE, // Example of using environment variables
  },
};