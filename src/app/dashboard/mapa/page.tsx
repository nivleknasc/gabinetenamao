'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Lead } from '@/lib/supabase/client';

// Importar o componente de mapa dinamicamente, sem SSR
const MapPage = dynamic(() => import('@/components/map/MapPage'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
      <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
    </div>
  )
});

export default function MapaPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Mapa de Leads</h1>

        <Suspense fallback={
          <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
            <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
          </div>
        }>
          <MapPage />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
