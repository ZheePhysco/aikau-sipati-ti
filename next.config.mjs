/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://mentawaitatto.com',
  },
}

export default nextConfig