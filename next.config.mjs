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
    // ✅ Add this to allow mobile devices on your local network
    allowedDevOrigins: ['http://192.168.100.4:3000'], // Replace with your PC's current IP if different
  },
  webpack(config) {
    // Exclude .svg from default asset handling
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Ignore .map files
    config.module.rules.push({
      test: /\.map$/,
      use: 'ignore-loader',
    });

    // Add SVGR loader for SVGs
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
