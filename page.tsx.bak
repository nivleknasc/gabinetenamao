'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { ChartBarIcon, UserGroupIcon, DocumentTextIcon, MapIcon } from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import StatDetails from '@/components/dashboard/StatDetails';
import LeadsTable from '@/components/dashboard/LeadsTable';
import FormulariosAtivos from '@/components/dashboard/FormulariosAtivos';
import LeadsPorBairro from '@/components/dashboard/LeadsPorBairro';
import AIInsights from '@/components/dashboard/AIInsights';
import { MapCard } from '@/components/map/MapCard';
import { GoogleMapCard } from '@/components/map/GoogleMapCard';
import { supabase, Lead, Formulario } from '@/lib/supabase/client';
import mockLeads from '@/data/mockLeads';

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalLeads, setTotalLeads] = useState(0);
  const [leadsHoje, setLeadsHoje] = useState(0);

  // Estado para controlar qual modal de detalhes está aberto
  const [detailsOpen, setDetailsOpen] = useState<{
    type: 'totalLeads' | 'leadsHoje' | 'formularios' | 'cidades' | null;
    isOpen: boolean;
  }>({ type: null, isOpen: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Em um ambiente real, você buscaria os dados do Supabase
        // const { data, error } = await supabase.from('leads').select('*');

        // Usando os 3500 leads aleatórios gerados

        // Dados de exemplo para demonstração - Formulários
        const mockFormularios: Formulario[] = [
          {
            id: '1',
            nome: 'Formulário de Contato',
            descricao: 'Formulário para captação de leads interessados em nossos produtos',
            campos: [
              {
                id: 'campo_1',
                nome: 'Nome',
                tipo: 'texto',
                obrigatorio: true,
              },
              {
                id: 'campo_2',
                nome: 'Email',
                tipo: 'email',
                obrigatorio: true,
              },
              {
                id: 'campo_3',
                nome: 'Telefone',
                tipo: 'telefone',
                obrigatorio: true,
              },
            ],
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            nome: 'Pesquisa de Satisfação',
            descricao: 'Formulário para avaliar a satisfação dos clientes',
            campos: [
              {
                id: 'campo_1',
                nome: 'Nome',
                tipo: 'texto',
                obrigatorio: true,
              },
              {
                id: 'campo_2',
                nome: 'Email',
                tipo: 'email',
                obrigatorio: true,
              },
              {
                id: 'campo_6',
                nome: 'Avaliação',
                tipo: 'radio',
                obrigatorio: true,
                opcoes: ['Excelente', 'Bom', 'Regular', 'Ruim', 'Péssimo'],
              },
            ],
            created_at: new Date().toISOString(),
          },
        ];

        // Usar os 3500 leads aleatórios
        setLeads(mockLeads);
        setFilteredLeads(mockLeads);
        setFormularios(mockFormularios);
        setTotalLeads(mockLeads.length);

        // Calcular leads de hoje
        const hoje = new Date().toISOString().split('T')[0];
        const leadsDeHoje = mockLeads.filter(
          (lead) => lead.data_captacao.split('T')[0] === hoje
        );
        setLeadsHoje(leadsDeHoje.length);

        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filters: { cidade?: string; estado?: string }) => {
    let filtered = [...leads];

    if (filters.cidade) {
      filtered = filtered.filter((lead) => lead.cidade === filters.cidade);
    }

    if (filters.estado) {
      filtered = filtered.filter((lead) => lead.estado === filters.estado);
    }

    setFilteredLeads(filtered);
  };

  // Função para abrir o modal de detalhes
  const openDetails = (type: 'totalLeads' | 'leadsHoje' | 'formularios' | 'cidades') => {
    setDetailsOpen({ type, isOpen: true });
  };

  // Função para fechar o modal de detalhes
  const closeDetails = () => {
    setDetailsOpen({ type: null, isOpen: false });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">GABINETE NA MÃO</h1>

        {/* Bento Grid - Estatísticas */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total de Leads"
            value={totalLeads}
            icon={<UserGroupIcon className="h-6 w-6 text-white" aria-hidden="true" />}
            onClick={() => openDetails('totalLeads')}
          />
          <StatCard
            title="Leads Hoje"
            value={leadsHoje}
            icon={<ChartBarIcon className="h-6 w-6 text-white" aria-hidden="true" />}
            change={`${leadsHoje} novos leads hoje`}
            trend="up"
            onClick={() => openDetails('leadsHoje')}
          />
          <StatCard
            title="Formulários Ativos"
            value={formularios.length}
            icon={<DocumentTextIcon className="h-6 w-6 text-white" aria-hidden="true" />}
            onClick={() => openDetails('formularios')}
          />
          <StatCard
            title="Cidades Mapeadas"
            value={Array.from(new Set(leads.map(lead => lead.cidade))).length}
            icon={<MapIcon className="h-6 w-6 text-white" aria-hidden="true" />}
            onClick={() => openDetails('cidades')}
          />
        </div>

        {/* Modal de Detalhes */}
        {detailsOpen.isOpen && detailsOpen.type && (
          <StatDetails
            type={detailsOpen.type}
            isOpen={detailsOpen.isOpen}
            onClose={closeDetails}
            leads={leads}
            formularios={formularios}
          />
        )}

        {/* Formulários Ativos - Destaque */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Formulários Ativos</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg">
              <p className="text-gray-500 dark:text-gray-400">Carregando formulários...</p>
            </div>
          ) : (
            <FormulariosAtivos formularios={formularios} />
          )}
        </div>

        {/* Bento Grid - Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1-2 - Tabela de Leads */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Leads Captados</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg">
                <p className="text-gray-500 dark:text-gray-400">Carregando dados...</p>
              </div>
            ) : (
              <LeadsTable leads={filteredLeads} onFilterChange={handleFilterChange} />
            )}

            {/* IA Insights */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Análise Inteligente</h2>
              {isLoading ? (
                <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg">
                  <p className="text-gray-500 dark:text-gray-400">Carregando dados...</p>
                </div>
              ) : (
                <AIInsights leads={leads} />
              )}
            </div>
          </div>

          {/* Coluna 3 - Mapa Simplificado */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Distribuição Geográfica</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg">
                <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
              </div>
            ) : (
              <Suspense fallback={
                <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg">
                  <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
                </div>
              }>
                <GoogleMapCard leads={leads} />
              </Suspense>
            )}

            {/* Leads por Bairro */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Leads por Bairro</h2>
              {isLoading ? (
                <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg">
                  <p className="text-gray-500 dark:text-gray-400">Carregando dados...</p>
                </div>
              ) : (
                <LeadsPorBairro leads={leads} />
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
