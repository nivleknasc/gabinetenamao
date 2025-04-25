'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FormulariosList from '@/components/forms/FormulariosList';
import { Formulario } from '@/lib/supabase/client';

export default function FormulariosPage() {
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        // Em um ambiente real, você buscaria os dados do Supabase
        // const { data, error } = await supabase.from('formularios').select('*');

        // Dados de exemplo para demonstração
        const mockFormularios: Formulario[] = [
          {
            id: '1',
            nome: 'Formulário de Contato',
            descricao: 'Formulário para captação de leads interessados em nossos produtos',
            campos: [
              {
                id: 'campo_1',
                nome: 'Nome',
                tipo: 'texto',
                obrigatorio: true,
              },
              {
                id: 'campo_2',
                nome: 'Email',
                tipo: 'email',
                obrigatorio: true,
              },
              {
                id: 'campo_3',
                nome: 'Telefone',
                tipo: 'telefone',
                obrigatorio: true,
              },
              {
                id: 'campo_4',
                nome: 'Cidade',
                tipo: 'texto',
                obrigatorio: true,
              },
              {
                id: 'campo_5',
                nome: 'Estado',
                tipo: 'select',
                obrigatorio: true,
                opcoes: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
              },
            ],
            imagemUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
            publicUrl: 'https://forms.gabinetemao.com.br/f/1',
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            nome: 'Pesquisa de Satisfação',
            descricao: 'Formulário para avaliar a satisfação dos clientes',
            campos: [
              {
                id: 'campo_1',
                nome: 'Nome',
                tipo: 'texto',
                obrigatorio: true,
              },
              {
                id: 'campo_2',
                nome: 'Email',
                tipo: 'email',
                obrigatorio: true,
              },
              {
                id: 'campo_3',
                nome: 'Telefone',
                tipo: 'telefone',
                obrigatorio: false,
              },
              {
                id: 'campo_4',
                nome: 'Cidade',
                tipo: 'texto',
                obrigatorio: true,
              },
              {
                id: 'campo_5',
                nome: 'Estado',
                tipo: 'select',
                obrigatorio: true,
                opcoes: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
              },
              {
                id: 'campo_6',
                nome: 'Avaliação',
                tipo: 'radio',
                obrigatorio: true,
                opcoes: ['Excelente', 'Bom', 'Regular', 'Ruim', 'Péssimo'],
              },
              {
                id: 'campo_7',
                nome: 'Comentários',
                tipo: 'texto',
                obrigatorio: false,
              },
            ],
            imagemUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
            publicUrl: 'https://forms.gabinetemao.com.br/f/2',
            created_at: new Date().toISOString(),
          },
        ];

        setFormularios(mockFormularios);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar formulários:', error);
        setIsLoading(false);
      }
    };

    fetchFormularios();
  }, []);

  const handleDeleteFormulario = async (id: string) => {
    try {
      // Em um ambiente real, você excluiria o formulário do Supabase
      // await supabase.from('formularios').delete().eq('id', id);

      // Atualizar a lista de formulários
      setFormularios(formularios.filter((form) => form.id !== id));
    } catch (error) {
      console.error('Erro ao excluir formulário:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Formulários</h1>

        <div className="mt-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow">
              <p className="text-gray-500">Carregando formulários...</p>
            </div>
          ) : (
            <FormulariosList
              formularios={formularios}
              onDelete={handleDeleteFormulario}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
