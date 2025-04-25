'use client';

import { Lead } from '@/lib/supabase/client';
import { useState, useMemo } from 'react';

interface DistribuicaoRegionalProps {
  leads: Lead[];
}

export default function DistribuicaoRegional({ leads }: DistribuicaoRegionalProps) {
  const [selectedEstado, setSelectedEstado] = useState<string | null>(null);
  const [selectedCidade, setSelectedCidade] = useState<string | null>(null);

  // Agrupar leads por estado
  const estadosData = useMemo(() => {
    const estados: Record<string, Lead[]> = {};
    
    leads.forEach(lead => {
      if (lead.estado) {
        if (!estados[lead.estado]) {
          estados[lead.estado] = [];
        }
        estados[lead.estado].push(lead);
      }
    });
    
    return Object.entries(estados).map(([estado, estadoLeads]) => ({
      estado,
      count: estadoLeads.length,
      leads: estadoLeads
    })).sort((a, b) => b.count - a.count);
  }, [leads]);

  // Agrupar leads por cidade (filtrado por estado selecionado)
  const cidadesData = useMemo(() => {
    if (!selectedEstado) return [];
    
    const cidades: Record<string, Lead[]> = {};
    
    leads
      .filter(lead => lead.estado === selectedEstado)
      .forEach(lead => {
        if (lead.cidade) {
          if (!cidades[lead.cidade]) {
            cidades[lead.cidade] = [];
          }
          cidades[lead.cidade].push(lead);
        }
      });
    
    return Object.entries(cidades).map(([cidade, cidadeLeads]) => ({
      cidade,
      count: cidadeLeads.length,
      leads: cidadeLeads
    })).sort((a, b) => b.count - a.count);
  }, [leads, selectedEstado]);

  // Agrupar leads por bairro (filtrado por cidade selecionada)
  const bairrosData = useMemo(() => {
    if (!selectedCidade) return [];
    
    const bairros: Record<string, Lead[]> = {};
    
    leads
      .filter(lead => lead.cidade === selectedCidade)
      .forEach(lead => {
        const bairro = lead.bairro || 'Não informado';
        if (!bairros[bairro]) {
          bairros[bairro] = [];
        }
        bairros[bairro].push(lead);
      });
    
    return Object.entries(bairros).map(([bairro, bairroLeads]) => ({
      bairro,
      count: bairroLeads.length,
      leads: bairroLeads
    })).sort((a, b) => b.count - a.count);
  }, [leads, selectedCidade]);

  // Selecionar um estado
  const handleEstadoClick = (estado: string) => {
    setSelectedEstado(estado);
    setSelectedCidade(null);
  };

  // Selecionar uma cidade
  const handleCidadeClick = (cidade: string) => {
    setSelectedCidade(cidade);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Distribuição Regional de Leads</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Visualização por estados, cidades e bairros
        </p>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          {/* Coluna de Estados */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estados</h3>
            <div className="space-y-2">
              {estadosData.map(({ estado, count }) => (
                <button
                  key={estado}
                  onClick={() => handleEstadoClick(estado)}
                  className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-sm ${
                    selectedEstado === estado
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span>{estado}</span>
                  <span className="px-2 py-1 rounded-full bg-gray-600 dark:bg-gray-500 text-white text-xs">
                    {count} leads
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Coluna de Cidades */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {selectedEstado ? `Cidades de ${selectedEstado}` : 'Cidades'}
            </h3>
            <div className="space-y-2">
              {selectedEstado ? (
                cidadesData.length > 0 ? (
                  cidadesData.map(({ cidade, count }) => (
                    <button
                      key={cidade}
                      onClick={() => handleCidadeClick(cidade)}
                      className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-sm ${
                        selectedCidade === cidade
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span>{cidade}</span>
                      <span className="px-2 py-1 rounded-full bg-gray-600 dark:bg-gray-500 text-white text-xs">
                        {count} leads
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400 p-3">
                    Nenhuma cidade encontrada
                  </div>
                )
              ) : (
                <div className="text-sm text-gray-500 dark:text-gray-400 p-3">
                  Selecione um estado
                </div>
              )}
            </div>
          </div>
          
          {/* Coluna de Bairros */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bairros</h3>
            <div className="space-y-2">
              {selectedCidade ? (
                bairrosData.length > 0 ? (
                  bairrosData.map(({ bairro, count }) => (
                    <div
                      key={bairro}
                      className="w-full flex justify-between items-center px-3 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <span>{bairro}</span>
                      <span className="px-2 py-1 rounded-full bg-gray-600 dark:bg-gray-500 text-white text-xs">
                        {count} leads
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400 p-3">
                    Nenhum bairro encontrado
                  </div>
                )
              ) : (
                <div className="text-sm text-gray-500 dark:text-gray-400 p-3">
                  Selecione uma cidade
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
