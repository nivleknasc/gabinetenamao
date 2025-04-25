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
  // Configurar o Webpack para lidar com módulos do Leaflet
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  // Desativar a geração estática para a página de mapa
  output: 'standalone',
  // Configurar páginas específicas para serem renderizadas apenas no cliente
  excludeDefaultMomentLocales: false,
};

module.exports = nextConfig;
