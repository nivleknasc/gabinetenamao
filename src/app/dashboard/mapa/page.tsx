'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function MapaPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Mapa de Leads</h1>

        <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl p-6">
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Visualização de Mapa</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              O mapa interativo está disponível apenas na versão local do dashboard.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Para visualizar o mapa completo com todas as funcionalidades, acesse o dashboard em seu ambiente local.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
