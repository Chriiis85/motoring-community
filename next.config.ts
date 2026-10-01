import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'media.formula1.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'images.ecestaticos.com' },
      { protocol: 'https', hostname: 'f1-fansite.com' },
      { protocol: 'https', hostname: 'img2.rtve.es' }
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'payment=()',
              'usb=()',
              'magnetometer=()',
              'accelerometer=()',
              'gyroscope=()',
              'geolocation=(self)',
              'clipboard-write=(self)',
              'fullscreen=(self)',
              'screen-wake-lock=(self)'
            ].join(', ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
