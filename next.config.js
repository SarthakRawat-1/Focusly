const path = require('path');

const nextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  experimental: {
    esmExternals: false,
  },
  webpack: (config) => {
    // Add path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '.'),
      '@/components': path.resolve(__dirname, 'components'),
      '@/hooks': path.resolve(__dirname, 'hooks'),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@/types': path.resolve(__dirname, 'types'),
      '@/app': path.resolve(__dirname, 'app'),
      '@/context': path.resolve(__dirname, 'context'),
      '@/schema': path.resolve(__dirname, 'schema'),
      '@/store': path.resolve(__dirname, 'store'),
      '@/providers': path.resolve(__dirname, 'providers'),
    };
    
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

const withNextIntl = require("next-intl/plugin")("./i18n.ts");

module.exports = withNextIntl(nextConfig);