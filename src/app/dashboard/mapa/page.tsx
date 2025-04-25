'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Importar o componente do Google Maps dinamicamente, sem SSR
const GoogleMapsComponent = dynamic(() => import('@/components/map/GoogleMapsComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
      <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
    </div>
  )
});

// Dados de exemplo para demonstração
const mockLeads = [
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
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    bairro: 'Copacabana',
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
    bairro: 'Savassi',
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
    bairro: 'Batel',
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
    bairro: 'Moinhos de Vento',
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
    telefone: '(11) 97654-3210',
    cidade: 'São Paulo',
    estado: 'SP',
    bairro: 'Pinheiros',
    latitude: -23.5667,
    longitude: -46.6889,
    data_captacao: new Date().toISOString(),
    formulario_id: '1',
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    nome: 'Roberto Alves',
    email: 'roberto@exemplo.com',
    telefone: '(21) 98765-1234',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    bairro: 'Ipanema',
    latitude: -22.9848,
    longitude: -43.1985,
    data_captacao: new Date().toISOString(),
    formulario_id: '1',
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    nome: 'Juliana Costa',
    email: 'juliana@exemplo.com',
    telefone: '(11) 98888-7777',
    cidade: 'São Paulo',
    estado: 'SP',
    bairro: 'Moema',
    latitude: -23.5505,
    longitude: -46.6333,
    data_captacao: new Date().toISOString(),
    formulario_id: '2',
    created_at: new Date().toISOString(),
  },
];

export default function MapaPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Mapa de Leads</h1>

        <div className="grid grid-cols-1 gap-6">
          <Suspense fallback={
            <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
              <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
            </div>
          }>
            <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Mapa de Leads</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Mostrando {mockLeads.filter(lead => lead.latitude && lead.longitude).length} leads no mapa
                </p>
              </div>
              <div className="p-4">
                <GoogleMapsComponent leads={mockLeads} />
              </div>
            </div>
          </Suspense>
        </div>
      </div>
    </DashboardLayout>
  );
}
