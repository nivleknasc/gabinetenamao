'use client';

import { useState } from 'react';
import { FormularioCampo } from '@/lib/supabase/client';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface FormularioCampoEditorProps {
  campos: FormularioCampo[];
  onChange: (campos: FormularioCampo[]) => void;
}

export default function FormularioCampoEditor({ campos, onChange }: FormularioCampoEditorProps) {
  const [editingCampo, setEditingCampo] = useState<FormularioCampo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [opcoes, setOpcoes] = useState<string>('');

  const handleAddCampo = () => {
    setEditingCampo({
      id: `campo_${Date.now()}`,
      nome: '',
      tipo: 'texto',
      obrigatorio: false,
    });
    setOpcoes('');
    setShowForm(true);
  };

  const handleEditCampo = (campo: FormularioCampo) => {
    setEditingCampo(campo);
    setOpcoes(campo.opcoes?.join('\n') || '');
    setShowForm(true);
  };

  const handleDeleteCampo = (id: string) => {
    onChange(campos.filter(campo => campo.id !== id));
  };

  const handleSaveCampo = () => {
    if (!editingCampo || !editingCampo.nome) return;

    const campoToSave: FormularioCampo = {
      ...editingCampo,
    };

    // Processar opções para tipos select, checkbox e radio
    if (['select', 'checkbox', 'radio'].includes(campoToSave.tipo) && opcoes.trim()) {
      campoToSave.opcoes = opcoes
        .split('\n')
        .map(opcao => opcao.trim())
        .filter(opcao => opcao);
    } else {
      delete campoToSave.opcoes;
    }

    const newCampos = editingCampo.id
      ? campos.map(c => (c.id === editingCampo.id ? campoToSave : c))
      : [...campos, campoToSave];

    onChange(newCampos);
    setEditingCampo(null);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingCampo(null);
    setShowForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!editingCampo) return;

    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    if (name === 'opcoes') {
      setOpcoes(value);
    } else {
      setEditingCampo(prev => ({
        ...prev!,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Campos do Formulário</h3>
        <button
          type="button"
          onClick={handleAddCampo}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Adicionar Campo
        </button>
      </div>

      {campos.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {campos.map((campo) => (
              <li key={campo.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 rounded-md">
                      <span className="text-indigo-700 dark:text-indigo-300 font-medium">{campo.tipo.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {campo.nome} {campo.obrigatorio && <span className="text-red-500">*</span>}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Tipo: {campo.tipo.charAt(0).toUpperCase() + campo.tipo.slice(1)}
                        {campo.opcoes && ` (${campo.opcoes.length} opções)`}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEditCampo(campo)}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCampo(campo.id)}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-red-700 dark:text-red-300 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            Nenhum campo adicionado. Clique em "Adicionar Campo" para começar.
          </p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {editingCampo?.nome ? `Editar Campo: ${editingCampo.nome}` : 'Novo Campo'}
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nome do Campo
                </label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  value={editingCampo?.nome || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: Nome Completo"
                />
              </div>

              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tipo de Campo
                </label>
                <select
                  name="tipo"
                  id="tipo"
                  value={editingCampo?.tipo || 'texto'}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="texto">Texto</option>
                  <option value="email">Email</option>
                  <option value="telefone">Telefone</option>
                  <option value="select">Seleção (dropdown)</option>
                  <option value="checkbox">Caixas de Seleção (checkbox)</option>
                  <option value="radio">Opções Únicas (radio)</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="obrigatorio"
                  id="obrigatorio"
                  checked={editingCampo?.obrigatorio || false}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="obrigatorio" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Campo obrigatório
                </label>
              </div>

              {['select', 'checkbox', 'radio'].includes(editingCampo?.tipo || '') && (
                <div>
                  <label htmlFor="opcoes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Opções (uma por linha)
                  </label>
                  <textarea
                    name="opcoes"
                    id="opcoes"
                    rows={4}
                    value={opcoes}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Opção 1&#10;Opção 2&#10;Opção 3"
                  />
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveCampo}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
