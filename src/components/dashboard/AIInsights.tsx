'use client';

import { useState, useEffect } from 'react';
import { Lead } from '@/lib/supabase/client';
import { SparklesIcon, LightBulbIcon, ArrowPathIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { analisarLeadsComIA } from '@/lib/openai/client';
import Link from 'next/link';

interface AIInsightsProps {
  leads: Lead[];
}

interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'discovery' | 'suggestion' | 'trend';
  confidence: number;
}

export default function AIInsights({ leads }: AIInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (leads.length > 0 && !isLoading && insights.length === 0) {
      generateInsights();
    }
  }, [leads]);

  const generateInsights = async () => {
    setIsLoading(true);
    setIsGenerating(true);
    setError(null);

    try {
      // Verificar se há leads suficientes para análise
      if (leads.length < 3) {
        setError('Número insuficiente de leads para realizar uma análise detalhada.');
        setIsLoading(false);
        setIsGenerating(false);
        return;
      }

      // Chamar a API da OpenAI para análise
      const analiseIA = await analisarLeadsComIA(leads, false);

      // Converter os insights da API para o formato usado pelo componente
      const aiInsights: Insight[] = [];

      // Adicionar insights principais
      analiseIA.insights.forEach((insight, index) => {
        aiInsights.push({
          id: `insight-${index}`,
          title: insight.split('.')[0] || 'Insight relevante',
          description: insight,
          type: 'discovery',
          confidence: 0.85 + (Math.random() * 0.1), // Simular confiança entre 85% e 95%
        });
      });

      // Adicionar tendências
      analiseIA.tendencias.forEach((tendencia, index) => {
        aiInsights.push({
          id: `trend-${index}`,
          title: tendencia.titulo,
          description: tendencia.descricao,
          type: 'trend',
          confidence: tendencia.porcentagem ? tendencia.porcentagem / 100 : 0.8,
        });
      });

      // Adicionar recomendações
      analiseIA.recomendacoes.forEach((recomendacao, index) => {
        aiInsights.push({
          id: `suggestion-${index}`,
          title: recomendacao.split('.')[0] || 'Recomendação estratégica',
          description: recomendacao,
          type: 'suggestion',
          confidence: 0.75 + (Math.random() * 0.15), // Simular confiança entre 75% e 90%
        });
      });

      setInsights(aiInsights);
    } catch (error) {
      console.error('Erro ao gerar insights:', error);
      setError('Ocorreu um erro ao processar a análise. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
    }
  };

  const getIconForType = (type: Insight['type']) => {
    switch (type) {
      case 'discovery':
        return <SparklesIcon className="h-5 w-5 text-blue-500" />;
      case 'suggestion':
        return <LightBulbIcon className="h-5 w-5 text-yellow-500" />;
      case 'trend':
        return (
          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden transition-colors duration-200">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Insights de IA</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            Análise inteligente dos seus dados de leads
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard/analise-ia"
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            Análise completa
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
          <button
            onClick={generateInsights}
            disabled={isGenerating}
            className={`inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
              isGenerating
                ? 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
            } transition-colors duration-200`}
          >
            {isGenerating ? (
              <>
                <ArrowPathIcon className="h-4 w-4 mr-1 animate-spin" />
                Analisando...
              </>
            ) : (
              <>
                <ArrowPathIcon className="h-4 w-4 mr-1" />
                Atualizar
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <ArrowPathIcon className="h-8 w-8 text-gray-400 dark:text-gray-500 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Analisando seus dados com IA avançada...</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Isso pode levar alguns instantes</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={generateInsights}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        ) : insights.length > 0 ? (
          <div className="space-y-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    {getIconForType(insight.type)}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-md font-medium text-gray-900 dark:text-white">
                      {insight.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {insight.description}
                    </p>
                    <div className="mt-2 flex items-center">
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        Confiança: {Math.round(insight.confidence * 100)}%
                      </div>
                      <div className="ml-2 w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            insight.confidence > 0.85
                              ? 'bg-green-500 dark:bg-green-600'
                              : insight.confidence > 0.7
                                ? 'bg-blue-500 dark:bg-blue-600'
                                : 'bg-yellow-500 dark:bg-yellow-600'
                          }`}
                          style={{ width: `${insight.confidence * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              Nenhum insight disponível. Clique em "Atualizar" para analisar seus dados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
