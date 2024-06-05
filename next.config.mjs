/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        serverUrl: process.env.API_URL
      }
};


export default nextConfig;
