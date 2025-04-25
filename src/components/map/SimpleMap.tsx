'use client';

import { useState, useEffect } from 'react';
import { Lead } from '@/lib/supabase/client';

export default function SimpleMap({ leads }: { leads: Lead[] }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Agrupar leads por estado
  const leadsByState = leads.reduce((acc, lead) => {
    const { estado } = lead;
    if (!acc[estado]) {
      acc[estado] = [];
    }
    acc[estado].push(lead);
    return acc;
  }, {} as Record<string, Lead[]>);

  // Agrupar leads por cidade
  const leadsByCity = leads.reduce((acc, lead) => {
    const { cidade } = lead;
    if (!acc[cidade]) {
      acc[cidade] = [];
    }
    acc[cidade].push(lead);
    return acc;
  }, {} as Record<string, Lead[]>);

  if (!isClient) {
    return (
      <div className="h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Carregando visualização...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Distribuição por Estado</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(leadsByState).map(([estado, estadoLeads]) => (
            <div 
              key={estado}
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900 dark:text-white">{estado}</span>
                <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-1 rounded-full text-xs font-medium">
                  {estadoLeads.length} leads
                </span>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, (estadoLeads.length / leads.length) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Top Cidades</h3>
        <div className="space-y-3">
          {Object.entries(leadsByCity)
            .sort((a, b) => b[1].length - a[1].length)
            .slice(0, 6)
            .map(([cidade, cidadeLeads]) => (
              <div 
                key={cidade}
                className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">{cidade}</span>
                  <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-1 rounded-full text-xs font-medium">
                    {cidadeLeads.length} leads
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, (cidadeLeads.length / leads.length) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span className="inline-block w-3 h-3 rounded-full bg-indigo-600 mr-2"></span>
            Distribuição geográfica de leads
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total: {leads.length} leads
          </div>
        </div>
      </div>
    </div>
  );
}
