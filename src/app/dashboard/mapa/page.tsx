'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Importar o componente de mapa dinamicamente, sem SSR
const MapContainer = dynamic(() => import('@/components/map/MapContainer'), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
        <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
      </div>
      <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
        <p className="text-gray-500 dark:text-gray-400">Carregando dados regionais...</p>
      </div>
    </div>
  )
});

export default function MapaPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Mapa de Leads</h1>

        <Suspense fallback={
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
              <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
            </div>
            <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
              <p className="text-gray-500 dark:text-gray-400">Carregando dados regionais...</p>
            </div>
          </div>
        }>
          <MapContainer />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
