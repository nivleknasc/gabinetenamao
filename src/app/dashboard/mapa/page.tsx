'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DistribuicaoRegional from '@/components/map/DistribuicaoRegional';
import { supabase, Lead } from '@/lib/supabase/client';

// Importar o componente do Google Maps dinamicamente, sem SSR
const GoogleMapsComponent = dynamic(() => import('@/components/map/GoogleMapsComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
      <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
    </div>
  )
});

export default function MapaPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Erro ao buscar leads:', error);
          return;
        }

        setLeads(data || []);
      } catch (error) {
        console.error('Erro ao buscar leads:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeads();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Mapa de Leads</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna 1 - Visualização Geográfica */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Visualização Geográfica</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
                <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
              </div>
            ) : (
              <Suspense fallback={
                <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
                  <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
                </div>
              }>
                <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Mapa de Leads</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Mostrando {leads.filter(lead => lead.latitude && lead.longitude).length} leads no mapa
                    </p>
                  </div>
                  <div className="p-4">
                    <div style={{ height: '500px', width: '100%' }}>
                      <GoogleMapsComponent leads={leads} />
                    </div>
                  </div>
                </div>
              </Suspense>
            )}
          </div>

          {/* Coluna 2 - Distribuição Regional */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Distribuição Regional</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
                <p className="text-gray-500 dark:text-gray-400">Carregando dados...</p>
              </div>
            ) : (
              <DistribuicaoRegional leads={leads} />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
