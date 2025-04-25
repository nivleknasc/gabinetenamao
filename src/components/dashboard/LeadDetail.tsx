'use client';

import { useState } from 'react';
import { Lead } from '@/lib/supabase/client';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface LeadDetailProps {
  lead: Lead;
  onClose: () => void;
}

export default function LeadDetail({ lead, onClose }: LeadDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Detalhes do Lead</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nome</p>
                  <p className="text-base text-gray-900">{lead.nome}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base text-gray-900">{lead.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Telefone</p>
                  <p className="text-base text-gray-900">{lead.telefone}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Localização</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Cidade</p>
                  <p className="text-base text-gray-900">{lead.cidade}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Estado</p>
                  <p className="text-base text-gray-900">{lead.estado}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Coordenadas</p>
                  <p className="text-base text-gray-900">
                    {lead.latitude && lead.longitude
                      ? `${lead.latitude.toFixed(4)}, ${lead.longitude.toFixed(4)}`
                      : 'Não disponível'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Adicionais</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Data de Captação</p>
                <p className="text-base text-gray-900">
                  {new Date(lead.data_captacao).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">ID do Formulário</p>
                <p className="text-base text-gray-900">{lead.formulario_id}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
