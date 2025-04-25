/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Desabilitar a verificação de ESLint durante o build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Desabilitar a verificação de tipos durante o build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
