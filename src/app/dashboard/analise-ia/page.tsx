'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AnaliseDetalhada from '@/components/ia/AnaliseDetalhada';
import { Lead } from '@/lib/supabase/client';
import { ArrowPathIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { getRecentSubmissions } from '@/lib/supabase/submissionService';

export default function AnaliseIAPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [incluirComparacao, setIncluirComparacao] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        setIsLoading(true);
        setError(null);

        // Buscar submissões reais do Supabase
        const submissions = await getRecentSubmissions(500); // Limitar a 500 submissões recentes

        // Converter submissões para o formato de leads
        const leadsFromSubmissions: Lead[] = submissions.map(submission => ({
          id: submission.id || '',
          nome: submission.nome || 'Sem nome',
          email: submission.email || 'Sem email',
          telefone: submission.telefone || 'Sem telefone',
          cidade: submission.cidade || 'Sem cidade',
          estado: submission.estado || 'SP',
          bairro: submission.bairro || 'Sem bairro',
          cep: submission.cep || '',
          endereco: submission.endereco || '',
          data_captacao: submission.created_at || new Date().toISOString(),
          formulario_id: submission.formulario_id,
          dados_adicionais: submission.dados || {}
        }));

        setLeads(leadsFromSubmissions);
      } catch (err) {
        console.error('Erro ao processar leads:', err);
        setError('Ocorreu um erro ao carregar os dados. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeads();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Análise com IA</h1>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="comparacao"
                checked={incluirComparacao}
                onChange={(e) => setIncluirComparacao(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="comparacao" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Incluir comparação com base de votação
              </label>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl p-8">
            <div className="flex flex-col items-center justify-center">
              <ArrowPathIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 animate-spin mb-4" />
              <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                Carregando dados para análise...
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                Estamos preparando os dados para realizar uma análise detalhada com nossa IA.
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl p-8">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-red-600 dark:text-red-400 mb-2">
                Erro ao carregar dados
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        ) : (
          <AnaliseDetalhada leads={leads} incluirComparacao={incluirComparacao} />
        )}
      </div>
    </DashboardLayout>
  );
}
