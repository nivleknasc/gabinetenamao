'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormularioCampo } from '@/lib/supabase/client';

interface FormularioBuilderProps {
  onSave: (data: { nome: string; descricao: string; campos: FormularioCampo[] }) => void;
}

export default function FormularioBuilder({ onSave }: FormularioBuilderProps) {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      nome: '',
      descricao: '',
    },
  });
  
  const [campos, setCampos] = useState<FormularioCampo[]>([]);
  const [novoCampo, setNovoCampo] = useState<Partial<FormularioCampo>>({
    nome: '',
    tipo: 'texto',
    obrigatorio: false,
  });
  const [opcoes, setOpcoes] = useState<string>('');

  const adicionarCampo = () => {
    if (!novoCampo.nome) return;
    
    const id = `campo_${Date.now()}`;
    const campo: FormularioCampo = {
      id,
      nome: novoCampo.nome || '',
      tipo: (novoCampo.tipo as FormularioCampo['tipo']) || 'texto',
      obrigatorio: novoCampo.obrigatorio || false,
    };
    
    // Adicionar opções para campos select, checkbox ou radio
    if (['select', 'checkbox', 'radio'].includes(campo.tipo) && opcoes) {
      campo.opcoes = opcoes.split(',').map(opt => opt.trim());
    }
    
    setCampos([...campos, campo]);
    setNovoCampo({
      nome: '',
      tipo: 'texto',
      obrigatorio: false,
    });
    setOpcoes('');
  };

  const removerCampo = (id: string) => {
    setCampos(campos.filter(campo => campo.id !== id));
  };

  const onSubmit = (data: { nome: string; descricao: string }) => {
    if (campos.length === 0) {
      alert('Adicione pelo menos um campo ao formulário');
      return;
    }
    
    onSave({
      ...data,
      campos,
    });
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Criar Novo Formulário</h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome do Formulário
              </label>
              <input
                type="text"
                id="nome"
                {...register('nome', { required: 'Nome é obrigatório' })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                id="descricao"
                rows={3}
                {...register('descricao')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Campos do Formulário</h3>
              
              <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label htmlFor="campo-nome" className="block text-sm font-medium text-gray-700">
                    Nome do Campo
                  </label>
                  <input
                    type="text"
                    id="campo-nome"
                    value={novoCampo.nome}
                    onChange={(e) => setNovoCampo({ ...novoCampo, nome: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="campo-tipo" className="block text-sm font-medium text-gray-700">
                    Tipo
                  </label>
                  <select
                    id="campo-tipo"
                    value={novoCampo.tipo}
                    onChange={(e) => setNovoCampo({ ...novoCampo, tipo: e.target.value as FormularioCampo['tipo'] })}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="texto">Texto</option>
                    <option value="email">Email</option>
                    <option value="telefone">Telefone</option>
                    <option value="select">Select</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                  </select>
                </div>
                
                <div className="sm:col-span-1">
                  <div className="flex items-center h-full mt-6">
                    <input
                      id="campo-obrigatorio"
                      type="checkbox"
                      checked={novoCampo.obrigatorio}
                      onChange={(e) => setNovoCampo({ ...novoCampo, obrigatorio: e.target.checked })}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="campo-obrigatorio" className="ml-2 block text-sm text-gray-700">
                      Obrigatório
                    </label>
                  </div>
                </div>
                
                <div className="sm:col-span-1">
                  <div className="flex items-end h-full">
                    <button
                      type="button"
                      onClick={adicionarCampo}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
              
              {['select', 'checkbox', 'radio'].includes(novoCampo.tipo || '') && (
                <div className="mt-4">
                  <label htmlFor="opcoes" className="block text-sm font-medium text-gray-700">
                    Opções (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    id="opcoes"
                    value={opcoes}
                    onChange={(e) => setOpcoes(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Opção 1, Opção 2, Opção 3"
                  />
                </div>
              )}
              
              {campos.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700">Campos Adicionados</h4>
                  <ul className="mt-3 divide-y divide-gray-200 border-t border-b border-gray-200">
                    {campos.map((campo) => (
                      <li key={campo.id} className="py-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{campo.nome}</p>
                          <p className="text-sm text-gray-500">
                            Tipo: {campo.tipo} {campo.obrigatorio && '(Obrigatório)'}
                          </p>
                          {campo.opcoes && (
                            <p className="text-sm text-gray-500">
                              Opções: {campo.opcoes.join(', ')}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removerCampo(campo.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Salvar Formulário
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
