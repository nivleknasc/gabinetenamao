'use client';

import { Lead } from "@/lib/supabase/client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Importar o componente do mapa dinamicamente para evitar problemas de SSR
const GoogleMapsComponent = dynamic(() => import("./GoogleMapsComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
    </div>
  ),
});

export function GoogleMapCard({ leads }: { leads: Lead[] }) {
  const validLeads = leads.filter(lead => lead.latitude && lead.longitude);
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Mapa de Leads</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Mostrando {validLeads.length} leads no mapa
        </p>
      </div>
      <div className="p-4">
        <Suspense fallback={
          <div className="h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
          </div>
        }>
          <GoogleMapsComponent leads={leads} />
        </Suspense>
      </div>
    </div>
  );
}
