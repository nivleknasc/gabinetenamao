'use client';

import { useState, useEffect } from 'react';
import { Lead } from '@/lib/supabase/client';
import { SparklesIcon, LightBulbIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

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
  
  useEffect(() => {
    if (leads.length > 0 && !isLoading && insights.length === 0) {
      generateInsights();
    }
  }, [leads]);
  
  const generateInsights = async () => {
    setIsLoading(true);
    setIsGenerating(true);
    
    try {
      // Em um ambiente real, você faria uma chamada para uma API de IA
      // Aqui, vamos simular uma análise com base nos dados
      
      // Simular um atraso para parecer que está processando
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockInsights: Insight[] = [];
      
      // Análise por bairro
      const bairrosCount: Record<string, { count: number; cidade: string }> = {};
      leads.forEach(lead => {
        if (!bairrosCount[lead.bairro]) {
          bairrosCount[lead.bairro] = { count: 0, cidade: lead.cidade };
        }
        bairrosCount[lead.bairro].count += 1;
      });
      
      // Encontrar o bairro com mais leads
      const topBairros = Object.entries(bairrosCount)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 3);
      
      if (topBairros.length > 0) {
        const [topBairro, { count, cidade }] = topBairros[0];
        mockInsights.push({
          id: '1',
          title: `${topBairro} é o bairro com mais leads`,
          description: `${count} leads foram captados no bairro ${topBairro} em ${cidade}. Considere direcionar mais recursos para esta área.`,
          type: 'discovery',
          confidence: 0.92,
        });
      }
      
      // Análise por horário
      const horariosCaptacao: Record<string, number> = {
        'manhã': 0,
        'tarde': 0,
        'noite': 0,
      };
      
      leads.forEach(lead => {
        const hora = new Date(lead.data_captacao).getHours();
        if (hora >= 6 && hora < 12) horariosCaptacao['manhã'] += 1;
        else if (hora >= 12 && hora < 18) horariosCaptacao['tarde'] += 1;
        else horariosCaptacao['noite'] += 1;
      });
      
      const melhorHorario = Object.entries(horariosCaptacao)
        .sort((a, b) => b[1] - a[1])[0][0];
      
      mockInsights.push({
        id: '2',
        title: `Melhor horário para captação: ${melhorHorario}`,
        description: `A maioria dos leads são captados durante o período da ${melhorHorario}. Considere intensificar campanhas neste horário.`,
        type: 'suggestion',
        confidence: 0.85,
      });
      
      // Análise de formulários
      const formulariosCount: Record<string, number> = {};
      leads.forEach(lead => {
        if (!formulariosCount[lead.formulario_id]) {
          formulariosCount[lead.formulario_id] = 0;
        }
        formulariosCount[lead.formulario_id] += 1;
      });
      
      const topFormulario = Object.entries(formulariosCount)
        .sort((a, b) => b[1] - a[1])[0];
      
      mockInsights.push({
        id: '3',
        title: `Formulário mais eficiente: ID ${topFormulario[0]}`,
        description: `O formulário ID ${topFormulario[0]} captou ${topFormulario[1]} leads. Analise este formulário para entender o que o torna mais eficiente.`,
        type: 'discovery',
        confidence: 0.88,
      });
      
      // Análise de crescimento
      const hoje = new Date();
      const ontem = new Date(hoje);
      ontem.setDate(ontem.getDate() - 1);
      
      const leadsHoje = leads.filter(lead => {
        const data = new Date(lead.data_captacao);
        return data.toDateString() === hoje.toDateString();
      }).length;
      
      const leadsOntem = leads.filter(lead => {
        const data = new Date(lead.data_captacao);
        return data.toDateString() === ontem.toDateString();
      }).length;
      
      const crescimento = leadsHoje - leadsOntem;
      
      if (crescimento > 0) {
        mockInsights.push({
          id: '4',
          title: `Crescimento de ${crescimento} leads hoje`,
          description: `Houve um aumento de ${crescimento} leads em relação ao dia anterior. Continue com as estratégias atuais.`,
          type: 'trend',
          confidence: 0.78,
        });
      } else if (crescimento < 0) {
        mockInsights.push({
          id: '4',
          title: `Queda de ${Math.abs(crescimento)} leads hoje`,
          description: `Houve uma diminuição de ${Math.abs(crescimento)} leads em relação ao dia anterior. Revise suas estratégias de captação.`,
          type: 'trend',
          confidence: 0.78,
        });
      }
      
      // Sugestão de expansão
      if (topBairros.length > 1) {
        const segundoBairro = topBairros[1][0];
        const terceiroBairro = topBairros.length > 2 ? topBairros[2][0] : null;
        
        mockInsights.push({
          id: '5',
          title: 'Oportunidade de expansão',
          description: `Considere expandir sua atuação para bairros próximos a ${topBairros[0][0]}, como ${segundoBairro}${terceiroBairro ? ` e ${terceiroBairro}` : ''}, que já mostram bom potencial de captação.`,
          type: 'suggestion',
          confidence: 0.75,
        });
      }
      
      setInsights(mockInsights);
    } catch (error) {
      console.error('Erro ao gerar insights:', error);
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
      
      <div className="p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <ArrowPathIcon className="h-8 w-8 text-gray-400 dark:text-gray-500 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Analisando seus dados...</p>
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
                          className="h-full bg-gray-800 dark:bg-gray-400 rounded-full"
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
