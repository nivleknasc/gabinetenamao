'use client';

import { useState, useEffect } from 'react';
import { Lead } from '@/lib/supabase/client';

interface RegionData {
  estado: string;
  cidades: {
    [cidade: string]: {
      total: number;
      bairros: {
        [bairro: string]: number;
      };
    };
  };
}

export default function ClientSideRegions({ leads }: { leads: Lead[] }) {
  const [isClient, setIsClient] = useState(false);
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [selectedEstado, setSelectedEstado] = useState<string | null>(null);
  const [selectedCidade, setSelectedCidade] = useState<string | null>(null);
  
  useEffect(() => {
    setIsClient(true);
    
    // Processar os leads para agrupar por estado, cidade e bairro
    const regionsMap = new Map<string, RegionData>();
    
    leads.forEach(lead => {
      const { estado, cidade, bairro } = lead;
      
      if (!regionsMap.has(estado)) {
        regionsMap.set(estado, {
          estado,
          cidades: {}
        });
      }
      
      const regionData = regionsMap.get(estado)!;
      
      if (!regionData.cidades[cidade]) {
        regionData.cidades[cidade] = {
          total: 0,
          bairros: {}
        };
      }
      
      regionData.cidades[cidade].total += 1;
      
      if (!regionData.cidades[cidade].bairros[bairro]) {
        regionData.cidades[cidade].bairros[bairro] = 0;
      }
      
      regionData.cidades[cidade].bairros[bairro] += 1;
    });
    
    // Converter o Map para array
    const regionsArray = Array.from(regionsMap.values());
    setRegionData(regionsArray);
    
    // Selecionar o primeiro estado por padrão se houver dados
    if (regionsArray.length > 0 && !selectedEstado) {
      setSelectedEstado(regionsArray[0].estado);
    }
  }, [leads, selectedEstado]);
  
  if (!isClient) {
    return (
      <div className="h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Carregando dados regionais...</p>
      </div>
    );
  }
  
  // Obter as cidades do estado selecionado
  const cidadesDoEstado = selectedEstado 
    ? regionData.find(r => r.estado === selectedEstado)?.cidades || {}
    : {};
  
  // Obter os bairros da cidade selecionada
  const bairrosDaCidade = (selectedEstado && selectedCidade)
    ? regionData.find(r => r.estado === selectedEstado)?.cidades[selectedCidade]?.bairros || {}
    : {};
  
  // Calcular o total de leads por estado
  const totalPorEstado = regionData.reduce((acc, region) => {
    const estadoTotal = Object.values(region.cidades).reduce((sum, cidade) => sum + cidade.total, 0);
    acc[region.estado] = estadoTotal;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden transition-colors duration-200">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Distribuição Regional de Leads</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          Visualização por estados, cidades e bairros
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
        {/* Coluna 1: Estados */}
        <div className="p-4">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Estados</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {regionData.map(region => (
              <div 
                key={region.estado}
                className={`p-3 rounded-lg cursor-pointer transition-colors duration-150 ${
                  selectedEstado === region.estado 
                    ? 'bg-gray-200 dark:bg-gray-700' 
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => {
                  setSelectedEstado(region.estado);
                  setSelectedCidade(null);
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">{region.estado}</span>
                  <span className="bg-gray-800 text-white dark:bg-gray-600 px-2 py-1 rounded-full text-xs">
                    {totalPorEstado[region.estado]} leads
                  </span>
                </div>
              </div>
            ))}
            
            {regionData.length === 0 && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                Nenhum dado disponível
              </div>
            )}
          </div>
        </div>
        
        {/* Coluna 2: Cidades do estado selecionado */}
        <div className="p-4">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
            {selectedEstado ? `Cidades de ${selectedEstado}` : 'Cidades'}
          </h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {selectedEstado ? (
              Object.entries(cidadesDoEstado).length > 0 ? (
                Object.entries(cidadesDoEstado).map(([cidade, data]) => (
                  <div 
                    key={cidade}
                    className={`p-3 rounded-lg cursor-pointer transition-colors duration-150 ${
                      selectedCidade === cidade 
                        ? 'bg-gray-200 dark:bg-gray-700' 
                        : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedCidade(cidade)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900 dark:text-white">{cidade}</span>
                      <span className="bg-gray-800 text-white dark:bg-gray-600 px-2 py-1 rounded-full text-xs">
                        {data.total} leads
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  Nenhuma cidade encontrada
                </div>
              )
            ) : (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                Selecione um estado
              </div>
            )}
          </div>
        </div>
        
        {/* Coluna 3: Bairros da cidade selecionada */}
        <div className="p-4">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
            {selectedCidade ? `Bairros de ${selectedCidade}` : 'Bairros'}
          </h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {selectedCidade ? (
              Object.entries(bairrosDaCidade).length > 0 ? (
                Object.entries(bairrosDaCidade)
                  .sort((a, b) => b[1] - a[1]) // Ordenar por quantidade (decrescente)
                  .map(([bairro, quantidade]) => (
                    <div 
                      key={bairro}
                      className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900 dark:text-white">{bairro}</span>
                        <span className="bg-gray-800 text-white dark:bg-gray-600 px-2 py-1 rounded-full text-xs">
                          {quantidade} leads
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  Nenhum bairro encontrado
                </div>
              )
            ) : (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                Selecione uma cidade
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
