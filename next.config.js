const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' *.vercel-scripts.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/${
    process.env.NODE_ENV === 'development' ? ` 'unsafe-eval'` : ''
  };
  style-src 'self' fonts.googleapis.com 'unsafe-inline';
  font-src 'self' fonts.googleapis.com fonts.gstatic.com;  
  img-src 'self' data:;
  connect-src 'self';
  form-action 'self';
  frame-src 'self' https://www.google.com/recaptcha/;
  frame-ancestors 'none';
  manifest-src 'self';
`;

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: async () => [
    {
      source: '/:path*',
      headers: securityHeaders,
    },
  ],
};

module.exports = nextConfig;
