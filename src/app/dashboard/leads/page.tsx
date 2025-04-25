'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LeadsTable from '@/components/dashboard/LeadsTable';
import { Lead } from '@/lib/supabase/client';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
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
            latitude: -23.5505,
            longitude: -46.6333,
            data_captacao: new Date().toISOString(),
            formulario_id: '1',
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            nome: 'Maria Oliveira',
            email: 'maria@exemplo.com',
            telefone: '(21) 98765-4321',
            cidade: 'Rio de Janeiro',
            estado: 'RJ',
            latitude: -22.9068,
            longitude: -43.1729,
            data_captacao: new Date().toISOString(),
            formulario_id: '1',
            created_at: new Date().toISOString(),
          },
          {
            id: '3',
            nome: 'Pedro Santos',
            email: 'pedro@exemplo.com',
            telefone: '(31) 98765-4321',
            cidade: 'Belo Horizonte',
            estado: 'MG',
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
            telefone: '(41) 98765-4321',
            cidade: 'Curitiba',
            estado: 'PR',
            latitude: -25.4284,
            longitude: -49.2733,
            data_captacao: new Date().toISOString(),
            formulario_id: '2',
            created_at: new Date().toISOString(),
          },
          {
            id: '5',
            nome: 'Carlos Ferreira',
            email: 'carlos@exemplo.com',
            telefone: '(51) 98765-4321',
            cidade: 'Porto Alegre',
            estado: 'RS',
            latitude: -30.0346,
            longitude: -51.2177,
            data_captacao: new Date().toISOString(),
            formulario_id: '1',
            created_at: new Date().toISOString(),
          },
          {
            id: '6',
            nome: 'Fernanda Lima',
            email: 'fernanda@exemplo.com',
            telefone: '(81) 98765-4321',
            cidade: 'Recife',
            estado: 'PE',
            latitude: -8.0476,
            longitude: -34.8770,
            data_captacao: new Date().toISOString(),
            formulario_id: '2',
            created_at: new Date().toISOString(),
          },
          {
            id: '7',
            nome: 'Roberto Alves',
            email: 'roberto@exemplo.com',
            telefone: '(71) 98765-4321',
            cidade: 'Salvador',
            estado: 'BA',
            latitude: -12.9714,
            longitude: -38.5014,
            data_captacao: new Date().toISOString(),
            formulario_id: '1',
            created_at: new Date().toISOString(),
          },
        ];

        setLeads(mockLeads);
        setFilteredLeads(mockLeads);
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
