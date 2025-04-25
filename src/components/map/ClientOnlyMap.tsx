'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Lead } from '@/lib/supabase/client';

// Importar o componente LeadsMap dinamicamente, sem SSR
const LeadsMap = dynamic(() => import('./LeadsMap'), { ssr: false });
const LeadsMapRegions = dynamic(() => import('./LeadsMapRegions'), { ssr: false });

interface ClientOnlyMapProps {
  leads: Lead[];
}

export default function ClientOnlyMap({ leads }: ClientOnlyMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
          <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
        </div>
        <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
          <p className="text-gray-500 dark:text-gray-400">Carregando dados regionais...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Mapa interativo */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Visualização Geográfica</h2>
        <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
          <LeadsMap leads={leads} />
        </div>
      </div>

      {/* Distribuição por regiões */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Distribuição Regional</h2>
        <LeadsMapRegions leads={leads} />
      </div>
    </div>
  );
}
