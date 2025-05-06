'use client';

import { useState } from 'react';
import { Formulario } from '@/lib/supabase/client';
import { XMarkIcon, LinkIcon, InboxIcon } from '@heroicons/react/24/outline';
import FormularioHeader from './FormularioHeader';
import Link from 'next/link';

interface FormularioDetailProps {
  formulario: Formulario;
  onClose: () => void;
}

export default function FormularioDetail({ formulario, onClose }: FormularioDetailProps) {
  const [currentFormulario, setCurrentFormulario] = useState<Formulario>(formulario);

  const handleImageChange = (imageUrl: string) => {
    setCurrentFormulario(prev => ({
      ...prev,
      imagemUrl: imageUrl
    }));
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-100 dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Detalhes do Formulário</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {/* Cabeçalho do formulário com imagem */}
          <div className="mb-6">
            <FormularioHeader
              formulario={currentFormulario}
              onImageChange={handleImageChange}
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Informações Gerais</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {currentFormulario.campos.length} campos
              </span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome do Formulário</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{currentFormulario.nome}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Data de Criação</p>
                  <p className="text-base text-gray-900 dark:text-gray-300 mt-1">
                    {new Date(currentFormulario.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Descrição</p>
                    <p className="text-base text-gray-900 dark:text-gray-300 mt-1">{currentFormulario.descricao}</p>
                  </div>
                  <div className="flex space-x-2">
                    {currentFormulario.publicUrl && (
                      <a
                        href={currentFormulario.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <LinkIcon className="h-4 w-4 mr-1" />
                        Ver formulário online
                      </a>
                    )}
                    <Link
                      href={`/dashboard/formularios/${currentFormulario.id}/submissoes`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <InboxIcon className="h-4 w-4 mr-1" />
                      Ver submissões
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pré-visualização do Formulário</h3>
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <div className="space-y-4">
                {formulario.campos.map((campo) => (
                  <div key={campo.id} className="border-b border-gray-100 pb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {campo.nome} {campo.obrigatorio && <span className="text-red-500">*</span>}
                    </label>

                    {campo.tipo === 'texto' && (
                      <input type="text" disabled placeholder="Texto de exemplo"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50" />
                    )}

                    {campo.tipo === 'email' && (
                      <input type="email" disabled placeholder="email@exemplo.com"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50" />
                    )}

                    {campo.tipo === 'telefone' && (
                      <input type="tel" disabled placeholder="(00) 00000-0000"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50" />
                    )}

                    {campo.tipo === 'select' && (
                      <select disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50">
                        <option>Selecione uma opção</option>
                        {campo.opcoes?.map((opcao) => (
                          <option key={opcao}>{opcao}</option>
                        ))}
                      </select>
                    )}

                    {campo.tipo === 'radio' && campo.opcoes && (
                      <div className="mt-2 space-y-2">
                        {campo.opcoes.map((opcao) => (
                          <div key={opcao} className="flex items-center">
                            <input type="radio" disabled name={campo.id} className="h-4 w-4 text-indigo-600 border-gray-300" />
                            <label className="ml-2 block text-sm text-gray-700">{opcao}</label>
                          </div>
                        ))}
                      </div>
                    )}

                    {campo.tipo === 'checkbox' && campo.opcoes && (
                      <div className="mt-2 space-y-2">
                        {campo.opcoes.map((opcao) => (
                          <div key={opcao} className="flex items-center">
                            <input type="checkbox" disabled className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                            <label className="ml-2 block text-sm text-gray-700">{opcao}</label>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="mt-1 text-xs text-gray-500">
                      Campo do tipo: {campo.tipo.charAt(0).toUpperCase() + campo.tipo.slice(1)}
                    </p>
                  </div>
                ))}

                <div className="pt-4">
                  <button disabled className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 opacity-50 cursor-not-allowed">
                    Enviar Formulário
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Detalhes dos Campos</h3>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                      Nome
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Tipo
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Obrigatório
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Opções
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {formulario.campos.map((campo) => (
                    <tr key={campo.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {campo.nome}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campo.tipo.charAt(0).toUpperCase() + campo.tipo.slice(1)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campo.obrigatorio ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Sim
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Não
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campo.opcoes ? (
                          <div className="flex flex-wrap gap-1">
                            {campo.opcoes.map(opcao => (
                              <span key={opcao} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {opcao}
                              </span>
                            ))}
                          </div>
                        ) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Fechar
            </button>
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Editar Formulário
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
