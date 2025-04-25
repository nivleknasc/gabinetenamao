'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Formulario } from '@/lib/supabase/client';
import FormularioDetail from './FormularioDetail';

interface FormulariosListProps {
  formularios: Formulario[];
  onDelete: (id: string) => void;
}

export default function FormulariosList({ formularios, onDelete }: FormulariosListProps) {
  const [selectedFormulario, setSelectedFormulario] = useState<Formulario | null>(null);
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Formulários</h2>
        <Link
          href="/formularios/novo"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Novo Formulário
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nome
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Descrição
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Campos
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Data de Criação
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {formularios.length > 0 ? (
              formularios.map((formulario) => (
                <tr key={formulario.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formulario.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formulario.descricao}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formulario.campos.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(formulario.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                    <button
                      onClick={() => setSelectedFormulario(formulario)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Visualizar
                    </button>
                    <button
                      onClick={() => onDelete(formulario.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  Nenhum formulário encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedFormulario && (
        <FormularioDetail
          formulario={selectedFormulario}
          onClose={() => setSelectedFormulario(null)}
        />
      )}
    </div>
  );
}
