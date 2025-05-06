'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getFormularioById } from '@/lib/supabase/formularioService';
import { getFormSubmissions, FormSubmission } from '@/lib/supabase/submissionService';
import { Formulario } from '@/lib/supabase/client';
import { ArrowLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function SubmissoesPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [formulario, setFormulario] = useState<Formulario | null>(null);
  const [submissoes, setSubmissoes] = useState<FormSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Buscar o formulário
        const formData = await getFormularioById(id);
        if (!formData) {
          setError('Formulário não encontrado');
          return;
        }
        
        setFormulario(formData);
        
        // Buscar as submissões
        const submissions = await getFormSubmissions(id);
        setSubmissoes(submissions);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError('Ocorreu um erro ao carregar os dados');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const exportToCSV = () => {
    if (!submissoes.length || !formulario) return;
    
    // Obter todos os campos possíveis das submissões
    const allFields = new Set<string>();
    submissoes.forEach(sub => {
      Object.keys(sub.dados || {}).forEach(key => allFields.add(key));
    });
    
    // Criar cabeçalho do CSV
    const headers = ['ID', 'Data', 'Nome', 'Email', 'Telefone', 'Cidade', 'Estado', 'Bairro', 'CEP', 'Endereço', ...Array.from(allFields)];
    
    // Criar linhas do CSV
    const rows = submissoes.map(sub => {
      const row: string[] = [
        sub.id || '',
        sub.created_at ? format(new Date(sub.created_at), 'dd/MM/yyyy HH:mm') : '',
        sub.nome || '',
        sub.email || '',
        sub.telefone || '',
        sub.cidade || '',
        sub.estado || '',
        sub.bairro || '',
        sub.cep || '',
        sub.endereco || ''
      ];
      
      // Adicionar campos dinâmicos
      allFields.forEach(field => {
        row.push(sub.dados && sub.dados[field] !== undefined ? String(sub.dados[field]) : '');
      });
      
      return row;
    });
    
    // Converter para CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    // Criar blob e link para download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `submissoes_${formulario.nome.replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Submissões do Formulário
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {formulario?.nome} - {submissoes.length} submissões
            </p>
          </div>
        </div>
        
        <button
          onClick={exportToCSV}
          disabled={submissoes.length === 0}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Exportar CSV
        </button>
      </div>

      {submissoes.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Ainda não há submissões para este formulário.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Cidade
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Bairro
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {submissoes.map((submissao) => (
                  <tr key={submissao.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {submissao.created_at ? format(new Date(submissao.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR }) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {submissao.nome || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {submissao.email || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {submissao.telefone || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {submissao.cidade || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {submissao.bairro || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
