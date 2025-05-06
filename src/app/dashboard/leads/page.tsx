'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LeadsTable from '@/components/dashboard/LeadsTable';
import { Lead } from '@/lib/supabase/client';
import { getRecentSubmissions } from '@/lib/supabase/submissionService';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);

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
        setFilteredLeads(leadsFromSubmissions);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar leads:', error);
        setIsLoading(false);
      }
    };

    fetchLeads();
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Leads Captados</h1>

        <div className="mt-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow">
              <p className="text-gray-500">Carregando dados...</p>
            </div>
          ) : (
            <LeadsTable leads={filteredLeads} onFilterChange={handleFilterChange} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
