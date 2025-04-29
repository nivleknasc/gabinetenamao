'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { FormularioAparencia } from '@/lib/supabase/client';

interface FormularioAparenciaEditorProps {
  aparencia: FormularioAparencia;
  onChange: (aparencia: FormularioAparencia) => void;
}

export default function FormularioAparenciaEditor({ aparencia, onChange }: FormularioAparenciaEditorProps) {
  const handleChange = (field: keyof FormularioAparencia, value: any) => {
    onChange({
      ...aparencia,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Aparência do Formulário</h3>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6 space-y-6">
          {/* Opções de exibição */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Opções de Exibição</h4>

            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="mostrarCabecalho" className="text-sm text-gray-700 dark:text-gray-300">
                  Mostrar imagem de cabeçalho
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Exibe a imagem de cabeçalho no topo do formulário
                </p>
              </div>
              <Switch
                id="mostrarCabecalho"
                checked={aparencia.mostrarCabecalho}
                onCheckedChange={(checked) => handleChange('mostrarCabecalho', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="mostrarDescricaoInicio" className="text-sm text-gray-700 dark:text-gray-300">
                  Mostrar descrição no início
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Exibe a descrição do formulário antes dos campos
                </p>
              </div>
              <Switch
                id="mostrarDescricaoInicio"
                checked={aparencia.mostrarDescricaoInicio}
                onCheckedChange={(checked) => handleChange('mostrarDescricaoInicio', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="mostrarDescricaoFim" className="text-sm text-gray-700 dark:text-gray-300">
                  Mostrar descrição no final
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Exibe a descrição do formulário após os campos
                </p>
              </div>
              <Switch
                id="mostrarDescricaoFim"
                checked={aparencia.mostrarDescricaoFim}
                onCheckedChange={(checked) => handleChange('mostrarDescricaoFim', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="fundoEscuro" className="text-sm text-gray-700 dark:text-gray-300">
                  Tema escuro
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Utiliza cores escuras para o fundo do formulário
                </p>
              </div>
              <Switch
                id="fundoEscuro"
                checked={aparencia.fundoEscuro}
                onCheckedChange={(checked) => handleChange('fundoEscuro', checked)}
              />
            </div>
          </div>

          {/* Cores */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Cores</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="corFundo" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Cor de fundo
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="corFundo"
                    value={aparencia.corFundo}
                    onChange={(e) => handleChange('corFundo', e.target.value)}
                    className="h-8 w-8 rounded border-gray-300 dark:border-gray-600 mr-2"
                  />
                  <input
                    type="text"
                    value={aparencia.corFundo}
                    onChange={(e) => handleChange('corFundo', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="corTexto" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Cor do texto
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="corTexto"
                    value={aparencia.corTexto}
                    onChange={(e) => handleChange('corTexto', e.target.value)}
                    className="h-8 w-8 rounded border-gray-300 dark:border-gray-600 mr-2"
                  />
                  <input
                    type="text"
                    value={aparencia.corTexto}
                    onChange={(e) => handleChange('corTexto', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="corBotao" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Cor do botão
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="corBotao"
                    value={aparencia.corBotao}
                    onChange={(e) => handleChange('corBotao', e.target.value)}
                    className="h-8 w-8 rounded border-gray-300 dark:border-gray-600 mr-2"
                  />
                  <input
                    type="text"
                    value={aparencia.corBotao}
                    onChange={(e) => handleChange('corBotao', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pré-visualização */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Pré-visualização</h4>
        </div>
        <div
          className="p-6"
          style={{
            backgroundColor: aparencia.fundoEscuro ? '#1f2937' : aparencia.corFundo,
            color: aparencia.fundoEscuro ? '#f3f4f6' : aparencia.corTexto
          }}
        >
          {aparencia.mostrarCabecalho && (
            <div className="mb-6 bg-gray-200 dark:bg-gray-700 h-32 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Imagem de cabeçalho</span>
            </div>
          )}

          {aparencia.mostrarDescricaoInicio && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2" style={{ color: aparencia.fundoEscuro ? '#f3f4f6' : aparencia.corTexto }}>
                Título do Formulário
              </h3>
              <p className="text-sm" style={{ color: aparencia.fundoEscuro ? '#d1d5db' : aparencia.corTexto }}>
                Esta é a descrição do formulário que aparece no início. Aqui você pode explicar o propósito do formulário e fornecer instruções para o preenchimento.
              </p>
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input type="text" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md" disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md" disabled />
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 mr-2" disabled />
              <label className="text-sm">Aceito os termos de uso</label>
            </div>
          </div>

          <button
            className="w-full py-2 px-4 rounded-md font-medium text-white"
            style={{ backgroundColor: aparencia.corBotao }}
            disabled
          >
            Enviar
          </button>

          {aparencia.mostrarDescricaoFim && (
            <div className="mt-6">
              <p className="text-sm" style={{ color: aparencia.fundoEscuro ? '#d1d5db' : aparencia.corTexto }}>
                Esta é a descrição do formulário que aparece no final. Aqui você pode adicionar informações adicionais, como política de privacidade ou termos de uso.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
