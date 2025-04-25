'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Formulario } from '@/lib/supabase/client';
import FormularioDetail from '../forms/FormularioDetail';

interface FormulariosAtivosProps {
  formularios: Formulario[];
}

export default function FormulariosAtivos({ formularios }: FormulariosAtivosProps) {
  const [selectedFormulario, setSelectedFormulario] = useState<Formulario | null>(null);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden transition-colors duration-200">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Formulários Ativos</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          {formularios.length} formulário(s) disponível(is) para captação de leads
        </p>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {formularios.map((formulario) => (
            <div
              key={formulario.id}
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-5 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transform hover:-translate-y-1"
              onClick={() => setSelectedFormulario(formulario)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{formulario.nome}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{formulario.descricao}</p>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full h-8 w-8 flex items-center justify-center">
                  {formulario.campos.length}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {formulario.campos.slice(0, 3).map((campo) => (
                    <span key={campo.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      {campo.nome}
                    </span>
                  ))}
                  {formulario.campos.length > 3 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      +{formulario.campos.length - 3} campos
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>
                    Criado em {new Date(formulario.created_at).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Clique para detalhes
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {formularios.length === 0 && (
          <div className="text-center py-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">Nenhum formulário ativo encontrado</p>
            <Link
              href="/formularios/novo"
              className="inline-flex items-center mt-3 px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors duration-200"
            >
              Criar novo formulário
            </Link>
          </div>
        )}
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
