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
  // Configurar o Webpack para lidar com módulos problemáticos
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    // Adicionar regra para ignorar completamente o Leaflet
    config.module.rules.push({
      test: /leaflet|react-leaflet/,
      use: 'null-loader',
    });

    return config;
  },
  // Desativar a geração estática para a página de mapa
  output: 'standalone',
};

module.exports = nextConfig;
