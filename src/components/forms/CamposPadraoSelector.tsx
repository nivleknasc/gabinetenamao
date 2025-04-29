'use client';

import { useState } from 'react';
import { FormularioCampo } from '@/lib/supabase/client';
import { Switch } from '@/components/ui/switch';
import { estados } from '@/lib/estados/estados';

interface CamposPadraoSelectorProps {
  camposSelecionados: FormularioCampo[];
  onChange: (campos: FormularioCampo[]) => void;
}

// Campos padrão disponíveis
const camposPadrao: FormularioCampo[] = [
  {
    id: 'campo_nome',
    nome: 'Nome',
    tipo: 'texto',
    obrigatorio: true,
  },
  {
    id: 'campo_email',
    nome: 'Email',
    tipo: 'email',
    obrigatorio: true,
  },
  {
    id: 'campo_cep',
    nome: 'CEP',
    tipo: 'texto',
    obrigatorio: true,
  },
  {
    id: 'campo_estado',
    nome: 'Estado',
    tipo: 'select',
    obrigatorio: true,
    opcoes: estados.map(estado => estado.sigla),
  },
  {
    id: 'campo_cidade',
    nome: 'Cidade',
    tipo: 'texto',
    obrigatorio: true,
  },
  {
    id: 'campo_bairro',
    nome: 'Bairro',
    tipo: 'texto',
    obrigatorio: true,
  },
  {
    id: 'campo_endereco',
    nome: 'Endereço',
    tipo: 'texto',
    obrigatorio: true,
  },
  {
    id: 'campo_numero',
    nome: 'Número',
    tipo: 'texto',
    obrigatorio: true,
  },
  {
    id: 'campo_complemento',
    nome: 'Complemento',
    tipo: 'texto',
    obrigatorio: false,
  },
  {
    id: 'campo_whatsapp',
    nome: 'DDD + WhatsApp',
    tipo: 'telefone',
    obrigatorio: true,
  },
  {
    id: 'campo_termos',
    nome: 'Aceito os Termos de Uso',
    tipo: 'checkbox',
    obrigatorio: true,
  },
  {
    id: 'campo_politica',
    nome: 'Aceito a Política de uso de dados',
    tipo: 'checkbox',
    obrigatorio: true,
  },
];

export default function CamposPadraoSelector({ camposSelecionados, onChange }: CamposPadraoSelectorProps) {
  // Criar um mapa de IDs de campos selecionados para facilitar a verificação
  const [camposSelecionadosMap, setCamposSelecionadosMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    camposSelecionados.forEach(campo => {
      map[campo.id] = true;
    });
    return map;
  });

  const handleToggleCampo = (campo: FormularioCampo, isSelected: boolean) => {
    const newMap = { ...camposSelecionadosMap, [campo.id]: isSelected };
    setCamposSelecionadosMap(newMap);
    
    // Atualizar a lista de campos selecionados
    const novosCamposSelecionados = camposPadrao.filter(c => newMap[c.id]);
    onChange(novosCamposSelecionados);
  };

  const handleSelectAll = () => {
    const newMap: Record<string, boolean> = {};
    camposPadrao.forEach(campo => {
      newMap[campo.id] = true;
    });
    setCamposSelecionadosMap(newMap);
    onChange([...camposPadrao]);
  };

  const handleDeselectAll = () => {
    setCamposSelecionadosMap({});
    onChange([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Campos Padrão do Formulário</h3>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Selecionar Todos
          </button>
          <button
            type="button"
            onClick={handleDeselectAll}
            className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Limpar Todos
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {camposPadrao.map((campo) => (
            <li key={campo.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 rounded-md">
                    <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">{campo.tipo.charAt(0).toUpperCase()}</span>
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
                <Switch
                  checked={!!camposSelecionadosMap[campo.id]}
                  onCheckedChange={(checked) => handleToggleCampo(campo, checked)}
                  className="ml-4"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Informações Adicionais</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc pl-5">
          <li>O campo CEP permite preenchimento automático de endereço</li>
          <li>O campo Estado carrega automaticamente a lista de cidades</li>
          <li>Você pode adicionar campos personalizados além dos padrões</li>
          <li>Campos marcados com <span className="text-red-500">*</span> são obrigatórios</li>
        </ul>
      </div>
    </div>
  );
}
