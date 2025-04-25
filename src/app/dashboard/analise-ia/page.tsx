'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AIInsights from '@/components/dashboard/AIInsights';
import AIVotacaoAnalysis from '@/components/dashboard/AIVotacaoAnalysis';
import { Lead } from '@/lib/supabase/client';

export default function AnaliseIAPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // Em um ambiente real, você buscaria os dados do Supabase
        // const { data, error } = await supabase.from('leads').select('*');

        // Dados de exemplo para demonstração
        const mockLeads: Lead[] = [
          {
            id: '1',
            nome: 'João Silva',
            email: 'joao@exemplo.com',
            telefone: '(11) 98765-4321',
            cidade: 'São Paulo',
            estado: 'SP',
            bairro: 'Moema',
            latitude: -23.5505,
            longitude: -46.6333,
            data_captacao: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
            formulario_id: '1',
            created_at: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
          },
          {
            id: '2',
            nome: 'Maria Oliveira',
            email: 'maria@exemplo.com',
            telefone: '(21) 98765-4321',
            cidade: 'Guarulhos',
            estado: 'SP',
            bairro: 'Centro',
            latitude: -22.9068,
            longitude: -43.1729,
            data_captacao: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            formulario_id: '1',
            created_at: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
          },
          {
            id: '3',
            nome: 'Pedro Santos',
            email: 'pedro@exemplo.com',
            telefone: '(31) 98765-4321',
            cidade: 'Suzano',
            estado: 'SP',
            bairro: 'Centro',
            latitude: -19.9167,
            longitude: -43.9345,
            data_captacao: new Date().toISOString(),
            formulario_id: '2',
            created_at: new Date().toISOString(),
          },
          {
            id: '4',
            nome: 'Ana Souza',
            email: 'ana@exemplo.com',
            telefone: '(11) 97654-3210',
            cidade: 'São Paulo',
            estado: 'SP',
            bairro: 'Pinheiros',
            latitude: -23.5667,
            longitude: -46.6889,
            data_captacao: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
            formulario_id: '1',
            created_at: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
          },
          {
            id: '5',
            nome: 'Carlos Ferreira',
            email: 'carlos@exemplo.com',
            telefone: '(11) 91234-5678',
            cidade: 'São Paulo',
            estado: 'SP',
            bairro: 'Moema',
            latitude: -23.5505,
            longitude: -46.6333,
            data_captacao: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
            formulario_id: '2',
            created_at: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
          },
          {
            id: '6',
            nome: 'Fernanda Lima',
            email: 'fernanda@exemplo.com',
            telefone: '(21) 98765-1234',
            cidade: 'Itaquaquecetuba',
            estado: 'SP',
            bairro: 'Centro',
            latitude: -22.9848,
            longitude: -43.1985,
            data_captacao: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            formulario_id: '1',
            created_at: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
          },
          {
            id: '7',
            nome: 'Roberto Alves',
            email: 'roberto@exemplo.com',
            telefone: '(31) 99876-5432',
            cidade: 'Mogi das Cruzes',
            estado: 'SP',
            bairro: 'Centro',
            latitude: -19.9333,
            longitude: -43.9345,
            data_captacao: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
            formulario_id: '2',
            created_at: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
          },
          {
            id: '8',
            nome: 'Juliana Costa',
            email: 'juliana@exemplo.com',
            telefone: '(11) 98888-7777',
            cidade: 'São Paulo',
            estado: 'SP',
            bairro: 'Vila Mariana',
            latitude: -23.5882,
            longitude: -46.6382,
            data_captacao: new Date().toISOString(),
            formulario_id: '1',
            created_at: new Date().toISOString(),
          },
          {
            id: '9',
            nome: 'Marcos Oliveira',
            email: 'marcos@exemplo.com',
            telefone: '(11) 97777-8888',
            cidade: 'São Paulo',
            estado: 'SP',
            bairro: 'Moema',
            latitude: -23.5505,
            longitude: -46.6333,
            data_captacao: new Date().toISOString(),
            formulario_id: '1',
            created_at: new Date().toISOString(),
          },
          {
            id: '10',
            nome: 'Luciana Santos',
            email: 'luciana@exemplo.com',
            telefone: '(21) 96666-7777',
            cidade: 'Arujá',
            estado: 'SP',
            bairro: 'Centro',
            latitude: -22.9068,
            longitude: -43.1729,
            data_captacao: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
            formulario_id: '2',
            created_at: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
          },
          {
            id: '11',
            nome: 'Ricardo Pereira',
            email: 'ricardo@exemplo.com',
            telefone: '(31) 95555-6666',
            cidade: 'Santa Isabel',
            estado: 'SP',
            bairro: 'Centro',
            latitude: -19.9167,
            longitude: -43.9345,
            data_captacao: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
            formulario_id: '1',
            created_at: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
          },
          {
            id: '12',
            nome: 'Camila Rodrigues',
            email: 'camila@exemplo.com',
            telefone: '(11) 94444-5555',
            cidade: 'São Paulo',
            estado: 'SP',
            bairro: 'Pinheiros',
            latitude: -23.5667,
            longitude: -46.6889,
            data_captacao: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
            formulario_id: '2',
            created_at: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
          },
        ];

        setLeads(mockLeads);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar leads:', error);
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Análise Avançada com IA</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Insights inteligentes e análises preditivas para otimizar sua captação de leads.
        </p>

        <div className="grid grid-cols-1 gap-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg">
              <p className="text-gray-500 dark:text-gray-400">Carregando análises...</p>
            </div>
          ) : (
            <>
              <AIInsights leads={leads} />

              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Análise Comparativa: Base Eleitoral</h2>
                <AIVotacaoAnalysis leads={leads} />
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Análises Detalhadas</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Tendências Temporais</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Análise de padrões de captação ao longo do tempo
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                                Pico de captação às terças-feiras
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Análise histórica mostra que terças-feiras têm 27% mais conversões que outros dias da semana. Considere intensificar campanhas neste dia.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                                Ciclo de 14 dias identificado
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Detectamos um padrão cíclico de 14 dias nas conversões. Há um aumento significativo a cada duas semanas, sugerindo uma relação com ciclos de pagamento.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Análise Demográfica</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Padrões e correlações entre dados demográficos
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                                Correlação geográfica e socioeconômica
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Bairros com IDH mais alto (Moema, Pinheiros) mostram 3.2x mais engajamento. Considere adaptar a comunicação para diferentes perfis socioeconômicos.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                                Segmentação por faixa etária
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Análise de domínios de email e padrões de comportamento sugere que 68% dos leads são da faixa etária 25-45 anos. Recomendamos ajustar a comunicação para este público.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recomendações Estratégicas</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Sugestões baseadas em análise avançada de dados
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1 bg-gray-200 dark:bg-gray-700 rounded-full p-1">
                              <span className="text-lg font-bold text-gray-700 dark:text-gray-300">1</span>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                                Otimização de formulários
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                O formulário ID 1 tem taxa de conversão 37% maior que o ID 2. A análise mostra que formulários com menos de 5 campos têm 2.5x mais chances de serem preenchidos. Recomendamos simplificar o formulário ID 2.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1 bg-gray-200 dark:bg-gray-700 rounded-full p-1">
                              <span className="text-lg font-bold text-gray-700 dark:text-gray-300">2</span>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                                Expansão geográfica estratégica
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Análise de proximidade geográfica e similaridade socioeconômica sugere que os bairros Jardins (SP), Leblon (RJ) e Funcionários (BH) têm alto potencial de conversão baseado nos padrões atuais. Considere direcionar campanhas para estas áreas.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1 bg-gray-200 dark:bg-gray-700 rounded-full p-1">
                              <span className="text-lg font-bold text-gray-700 dark:text-gray-300">3</span>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                                Otimização de timing
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Análise temporal mostra que leads captados entre 19h-22h têm 43% mais engajamento subsequente. Recomendamos intensificar campanhas neste horário e implementar resposta automática imediata para maximizar conversões.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Previsões e Tendências</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Análise preditiva baseada em dados históricos
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                                Previsão de crescimento
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Baseado nos padrões atuais, projetamos um crescimento de 23% nos próximos 30 dias se mantidas as estratégias atuais. Com as otimizações recomendadas, este número pode chegar a 41%.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                                Alerta de sazonalidade
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Detectamos um padrão de queda de 18% nas conversões durante períodos de feriados prolongados. Recomendamos preparar campanhas especiais para estes períodos com 15 dias de antecedência.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                                Tendência emergente
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Análise de padrões emergentes indica um crescimento de 31% em leads provenientes de dispositivos móveis. Recomendamos otimizar a experiência mobile dos formulários e considerar estratégias específicas para este canal.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
