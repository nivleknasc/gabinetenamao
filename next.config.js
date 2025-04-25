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
  // Configurar renderização dinâmica para páginas específicas
  experimental: {
    missingSuspenseWithCSRInDevelopment: false,
  },
};

module.exports = nextConfig;
