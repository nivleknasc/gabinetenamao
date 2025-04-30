'use client';

import { useState, useEffect } from 'react';
import { Lead } from '@/lib/supabase/client';
import { analisarLeadsComIA, AnaliseIA } from '@/lib/openai/client';
import { ArrowPathIcon, LightBulbIcon, ChartBarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface AnaliseDetalhadaProps {
  leads: Lead[];
  incluirComparacao?: boolean;
}

export default function AnaliseDetalhada({ leads, incluirComparacao = false }: AnaliseDetalhadaProps) {
  const [analise, setAnalise] = useState<AnaliseIA | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function realizarAnalise() {
      try {
        setIsLoading(true);
        setError(null);

        // Verificar se há leads suficientes para análise
        if (leads.length < 3) {
          setError('Número insuficiente de leads para realizar uma análise detalhada.');
          setIsLoading(false);
          return;
        }

        // Verificar primeiro se a API da OpenAI está configurada
        try {
          const apiResponse = await fetch('/api/test-openai');
          const apiStatus = await apiResponse.json();

          if (!apiStatus.success) {
            throw new Error(`API da OpenAI não está configurada corretamente: ${apiStatus.message}`);
          }
        } catch (apiError: any) {
          console.error('Erro ao verificar API da OpenAI:', apiError);
          setError(`Erro na comunicação com a API de IA: ${apiError.message || 'Verifique se a chave da API está configurada corretamente em Administração > Configurar APIs'}`);
          setIsLoading(false);
          return;
        }

        const resultado = await analisarLeadsComIA(leads, incluirComparacao);
        setAnalise(resultado);
      } catch (err: any) {
        console.error('Erro ao realizar análise:', err);
        setError(`Ocorreu um erro ao processar a análise: ${err.message || 'Tente novamente mais tarde.'}`);
      } finally {
        setIsLoading(false);
      }
    }

    realizarAnalise();
  }, [leads, incluirComparacao]);

  const handleRefreshAnalise = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Verificar primeiro se a API da OpenAI está configurada
      try {
        const apiResponse = await fetch('/api/test-openai');
        const apiStatus = await apiResponse.json();

        if (!apiStatus.success) {
          throw new Error(`API da OpenAI não está configurada corretamente: ${apiStatus.message}`);
        }
      } catch (apiError: any) {
        console.error('Erro ao verificar API da OpenAI:', apiError);
        setError(`Erro na comunicação com a API de IA: ${apiError.message || 'Verifique se a chave da API está configurada corretamente em Administração > Configurar APIs'}`);
        setIsLoading(false);
        return;
      }

      const resultado = await analisarLeadsComIA(leads, incluirComparacao);
      setAnalise(resultado);
    } catch (err: any) {
      console.error('Erro ao atualizar análise:', err);
      setError(`Ocorreu um erro ao atualizar a análise: ${err.message || 'Tente novamente mais tarde.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl p-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <ArrowPathIcon className="h-5 w-5 text-blue-500 animate-spin" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Processando análise com IA...
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Estamos analisando {leads.length} leads para gerar insights relevantes.
          Este processo pode levar alguns instantes.
        </p>
      </div>
    );
  }

  if (error) {
    const isApiError = error.includes('API de IA') || error.includes('OpenAI');

    return (
      <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
            Não foi possível completar a análise
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleRefreshAnalise}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Tentar novamente
            </button>

            {isApiError && (
              <a
                href="/configurar-api"
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors inline-flex items-center justify-center"
              >
                Configurar API
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!analise) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho e Resumo */}
      <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Análise Detalhada com IA
            </h2>
            <button
              onClick={handleRefreshAnalise}
              className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              title="Atualizar análise"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">
              Resumo da Situação
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {analise.resumo}
            </p>
          </div>
        </div>
      </div>

      {/* Grid de Insights e Tendências */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insights */}
        <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                Insights Principais
              </h3>
            </div>

            <ul className="space-y-3">
              {analise.insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tendências */}
        <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <ChartBarIcon className="h-6 w-6 text-indigo-500 mr-2" />
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                Tendências Identificadas
              </h3>
            </div>

            <div className="space-y-4">
              {analise.tendencias.map((tendencia, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                    {tendencia.titulo}
                    {tendencia.porcentagem !== undefined && (
                      <span className="ml-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                        {tendencia.porcentagem}%
                      </span>
                    )}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {tendencia.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recomendações */}
      <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">
              Recomendações Estratégicas
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analise.recomendacoes.map((recomendacao, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{recomendacao}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparação com Base de Votação (se solicitado) */}
      {incluirComparacao && analise.comparacaoVotacao && (
        <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">
              Comparação com Base de Votação
            </h3>

            <div className="prose dark:prose-invert max-w-none mb-6">
              <p className="text-gray-600 dark:text-gray-300">
                {analise.comparacaoVotacao.resumo}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <LightBulbIcon className="h-5 w-5 text-yellow-500 mr-2" />
                  Insights da Comparação
                </h4>
                <ul className="space-y-2">
                  {analise.comparacaoVotacao.insights.map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium mr-2 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Recomendações Específicas
                </h4>
                <ul className="space-y-2">
                  {analise.comparacaoVotacao.recomendacoes.map((recomendacao, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium mr-2 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{recomendacao}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
