'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DadosVotacao from '@/components/politico/DadosVotacao';
import { Lead } from '@/lib/supabase/client';

export default function PoliticoPage() {
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
            data_captacao: new Date().toISOString(),
            formulario_id: '1',
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            nome: 'Maria Oliveira',
            email: 'maria@exemplo.com',
            telefone: '(21) 98765-4321',
            cidade: 'Guarulhos',
            estado: 'SP',
            bairro: 'Centro',
            latitude: -23.4543,
            longitude: -46.5332,
            data_captacao: new Date().toISOString(),
            formulario_id: '1',
            created_at: new Date().toISOString(),
          },
          {
            id: '3',
            nome: 'Pedro Santos',
            email: 'pedro@exemplo.com',
            telefone: '(31) 98765-4321',
            cidade: 'Guarulhos',
            estado: 'SP',
            bairro: 'Vila Galvão',
            latitude: -23.4667,
            longitude: -46.5500,
            data_captacao: new Date().toISOString(),
            formulario_id: '2',
            created_at: new Date().toISOString(),
          },
          {
            id: '4',
            nome: 'Ana Souza',
            email: 'ana@exemplo.com',
            telefone: '(11) 97654-3210',
            cidade: 'Suzano',
            estado: 'SP',
            bairro: 'Centro',
            latitude: -23.5432,
            longitude: -46.3108,
            data_captacao: new Date().toISOString(),
            formulario_id: '1',
            created_at: new Date().toISOString(),
          },
          {
            id: '5',
            nome: 'Carlos Ferreira',
            email: 'carlos@exemplo.com',
            telefone: '(11) 91234-5678',
            cidade: 'Mogi das Cruzes',
            estado: 'SP',
            bairro: 'Centro',
            latitude: -23.5221,
            longitude: -46.1854,
            data_captacao: new Date().toISOString(),
            formulario_id: '2',
            created_at: new Date().toISOString(),
          },
          {
            id: '6',
            nome: 'Fernanda Lima',
            email: 'fernanda@exemplo.com',
            telefone: '(21) 98765-1234',
            cidade: 'Itaquaquecetuba',
            estado: 'SP',
            bairro: 'Centro',
            latitude: -23.4868,
            longitude: -46.3487,
            data_captacao: new Date().toISOString(),
            formulario_id: '1',
            created_at: new Date().toISOString(),
          },
          {
            id: '7',
            nome: 'Roberto Alves',
            email: 'roberto@exemplo.com',
            telefone: '(31) 99876-5432',
            cidade: 'Arujá',
            estado: 'SP',
            bairro: 'Centro',
            latitude: -23.3968,
            longitude: -46.3201,
            data_captacao: new Date().toISOString(),
            formulario_id: '2',
            created_at: new Date().toISOString(),
          },
          {
            id: '8',
            nome: 'Juliana Costa',
            email: 'juliana@exemplo.com',
            telefone: '(11) 98888-7777',
            cidade: 'Guarulhos',
            estado: 'SP',
            bairro: 'Taboão',
            latitude: -23.4543,
            longitude: -46.5332,
            data_captacao: new Date().toISOString(),
            formulario_id: '1',
            created_at: new Date().toISOString(),
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
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Análise Política</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Compare dados eleitorais com leads captados para otimizar estratégias de comunicação.
        </p>
        
        <div className="grid grid-cols-1 gap-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg">
              <p className="text-gray-500 dark:text-gray-400">Carregando dados...</p>
            </div>
          ) : (
            <DadosVotacao leads={leads} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
