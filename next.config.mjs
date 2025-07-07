/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  experimental: {
    turbo: {
      resolveAlias: {
        "html-docx-js": "html-docx-js-typescript",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.map$/,
      use: 'ignore-loader', // <- ignore .map files
    });
    return config;
  },
};

export default nextConfig;
