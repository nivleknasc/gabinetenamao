'use client';

import { useState, useEffect } from 'react';
import { Lead } from '@/lib/supabase/client';

interface LeadsPorBairroProps {
  leads: Lead[];
}

interface BairroCount {
  bairro: string;
  cidade: string;
  estado: string;
  count: number;
}

export default function LeadsPorBairro({ leads }: LeadsPorBairroProps) {
  const [bairros, setBairros] = useState<BairroCount[]>([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    // Processar os leads para contar por bairro
    const bairrosMap = new Map<string, BairroCount>();

    leads.forEach(lead => {
      // Assumindo que temos um campo bairro no lead
      // Se não existir, precisaremos adicionar esse campo ao modelo Lead
      const bairro = lead.bairro || 'Não especificado';
      const key = `${bairro}-${lead.cidade}-${lead.estado}`;

      if (bairrosMap.has(key)) {
        const current = bairrosMap.get(key)!;
        bairrosMap.set(key, { ...current, count: current.count + 1 });
      } else {
        bairrosMap.set(key, {
          bairro,
          cidade: lead.cidade,
          estado: lead.estado,
          count: 1
        });
      }
    });

    // Converter o Map para array e ordenar por contagem (decrescente)
    const bairrosArray = Array.from(bairrosMap.values()).sort((a, b) => b.count - a.count);
    setBairros(bairrosArray);
  }, [leads]);

  // Filtrar bairros com base no texto de pesquisa
  const bairrosFiltrados = filtro
    ? bairros.filter(b =>
        b.bairro.toLowerCase().includes(filtro.toLowerCase()) ||
        b.cidade.toLowerCase().includes(filtro.toLowerCase()) ||
        b.estado.toLowerCase().includes(filtro.toLowerCase())
      )
    : bairros;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden transition-colors duration-200">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Leads por Bairro</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          {bairros.length} bairros mapeados
        </p>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Filtrar por bairro, cidade ou estado..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="overflow-y-auto max-h-96">
          {bairrosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bairrosFiltrados.map((item, index) => (
                <div
                  key={`${item.bairro}-${item.cidade}-${index}`}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.bairro}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.cidade}, {item.estado}</p>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full h-7 w-7 flex items-center justify-center text-sm font-medium">
                      {item.count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {filtro ? 'Nenhum bairro encontrado com esse filtro' : 'Nenhum bairro mapeado'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
