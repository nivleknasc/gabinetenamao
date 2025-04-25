'use client';

import { useState, useEffect } from 'react';
import { votacaoMauricioNeves, dadosGeraisCandidatura, DadosVotacao } from '@/data/votacao-mauricio-neves-2022';
import { Lead } from '@/lib/supabase/client';
import { MapIcon, ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

interface DadosVotacaoProps {
  leads?: Lead[];
}

interface CidadeComparativa {
  cidade: string;
  regiao: string;
  votos: number;
  percentualVotos: number;
  leads: number;
  potencialCrescimento: number;
}

export default function DadosVotacaoComponent({ leads = [] }: DadosVotacaoProps) {
  const [regiaoSelecionada, setRegiaoSelecionada] = useState<string | null>(null);
  const [dadosComparativos, setDadosComparativos] = useState<CidadeComparativa[]>([]);
  const [ordenarPor, setOrdenarPor] = useState<'votos' | 'leads' | 'potencial'>('votos');
  
  // Extrair regiões únicas
  const regioes = Array.from(new Set(votacaoMauricioNeves.map(item => item.regiao)));
  
  useEffect(() => {
    // Calcular dados comparativos entre votos e leads
    const dadosProcessados: CidadeComparativa[] = votacaoMauricioNeves
      .filter(cidade => !regiaoSelecionada || cidade.regiao === regiaoSelecionada)
      .map(cidade => {
        // Contar leads para esta cidade
        const leadsNaCidade = leads.filter(lead => 
          lead.cidade.toLowerCase() === cidade.cidade.toLowerCase()
        ).length;
        
        // Calcular potencial de crescimento (relação entre votos e leads)
        // Fórmula: (votos / (leads + 1)) - quanto maior, mais potencial inexplorado
        const potencialCrescimento = leadsNaCidade > 0 
          ? cidade.votos / leadsNaCidade 
          : cidade.votos;
        
        return {
          cidade: cidade.cidade,
          regiao: cidade.regiao,
          votos: cidade.votos,
          percentualVotos: cidade.percentual,
          leads: leadsNaCidade,
          potencialCrescimento: potencialCrescimento
        };
      });
    
    // Ordenar dados conforme seleção
    let dadosOrdenados = [...dadosProcessados];
    
    switch (ordenarPor) {
      case 'votos':
        dadosOrdenados.sort((a, b) => b.votos - a.votos);
        break;
      case 'leads':
        dadosOrdenados.sort((a, b) => b.leads - a.leads);
        break;
      case 'potencial':
        dadosOrdenados.sort((a, b) => b.potencialCrescimento - a.potencialCrescimento);
        break;
    }
    
    setDadosComparativos(dadosOrdenados);
  }, [leads, regiaoSelecionada, ordenarPor]);
  
  // Calcular estatísticas gerais
  const totalVotos = votacaoMauricioNeves.reduce((sum, cidade) => sum + cidade.votos, 0);
  const totalLeads = leads.length;
  const cidadesComLeads = new Set(leads.map(lead => lead.cidade.toLowerCase())).size;
  const cidadesComVotos = votacaoMauricioNeves.length;
  const cidadesSemLeads = votacaoMauricioNeves.filter(cidade => 
    !leads.some(lead => lead.cidade.toLowerCase() === cidade.cidade.toLowerCase())
  ).length;
  
  // Calcular top 5 cidades com maior potencial
  const topPotencial = [...dadosComparativos]
    .sort((a, b) => b.potencialCrescimento - a.potencialCrescimento)
    .slice(0, 5);
  
  return (
    <div className="space-y-6">
      {/* Cabeçalho com dados do político */}
      <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Dados Eleitorais - {dadosGeraisCandidatura.nome}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            {dadosGeraisCandidatura.cargo} - {dadosGeraisCandidatura.partido} - {dadosGeraisCandidatura.estado}
          </p>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Votos</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {dadosGeraisCandidatura.votacaoTotal.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
                  <ChartBarIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {dadosGeraisCandidatura.percentualEstado.toFixed(2)}% dos votos válidos
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Situação</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {dadosGeraisCandidatura.situacao}
                  </p>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
                  <MapIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {dadosGeraisCandidatura.posicao}º colocado no estado
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cobertura de Leads</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {((cidadesComLeads / cidadesComVotos) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {cidadesSemLeads} cidades sem leads captados
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filtros e controles */}
      <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <div>
              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                Análise Comparativa: Votos x Leads
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {dadosComparativos.length} cidades analisadas
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <select
                value={regiaoSelecionada || ''}
                onChange={(e) => setRegiaoSelecionada(e.target.value || null)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Todas as regiões</option>
                {regioes.map(regiao => (
                  <option key={regiao} value={regiao}>{regiao}</option>
                ))}
              </select>
              
              <select
                value={ordenarPor}
                onChange={(e) => setOrdenarPor(e.target.value as 'votos' | 'leads' | 'potencial')}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="votos">Ordenar por votos</option>
                <option value="leads">Ordenar por leads</option>
                <option value="potencial">Ordenar por potencial</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Tabela de dados */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cidade
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Região
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Votos
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  % na Cidade
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Leads
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Potencial
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {dadosComparativos.map((item, index) => (
                <tr key={item.cidade} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {item.cidade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.regiao}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.votos.toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.percentualVotos.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.leads}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.potencialCrescimento > 1000 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                          : item.potencialCrescimento > 100
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {item.potencialCrescimento > 9999 
                          ? 'Muito Alto' 
                          : item.potencialCrescimento.toFixed(0)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Insights de IA */}
      <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Insights Eleitorais
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            Análise de oportunidades baseada em dados eleitorais
          </p>
        </div>
        
        <div className="p-4">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                Top 5 Cidades com Maior Potencial de Crescimento
              </h4>
              <div className="space-y-2">
                {topPotencial.map(cidade => (
                  <div key={cidade.cidade} className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded-md">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">{cidade.cidade}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({cidade.regiao})</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Votos: </span>
                        <span className="font-medium text-gray-900 dark:text-white">{cidade.votos.toLocaleString('pt-BR')}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Leads: </span>
                        <span className="font-medium text-gray-900 dark:text-white">{cidade.leads}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                Recomendações Estratégicas
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-2">1</span>
                  <span>Priorize a captação de leads em cidades com alta votação e baixa presença digital, como {topPotencial[0]?.cidade} e {topPotencial[1]?.cidade}.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-2">2</span>
                  <span>Desenvolva campanhas específicas para a região {regioes[0]}, onde há forte base eleitoral.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-2">3</span>
                  <span>Implemente formulários personalizados para cidades com alto percentual de votos, como {votacaoMauricioNeves.sort((a, b) => b.percentual - a.percentual)[0].cidade}.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-2">4</span>
                  <span>Considere expandir a atuação para cidades vizinhas às bases eleitorais mais fortes.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-2">5</span>
                  <span>Monitore a evolução da captação de leads em relação à base eleitoral para ajustar estratégias continuamente.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
