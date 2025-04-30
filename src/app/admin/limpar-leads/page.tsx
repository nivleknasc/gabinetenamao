'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LimparLeadsPage() {
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const router = useRouter();

  const handleLimparLeads = async () => {
    // Verificar se a confirmação foi digitada corretamente
    if (confirmacao !== 'LIMPAR TODOS OS LEADS') {
      setErro('Por favor, digite a frase de confirmação exatamente como mostrada');
      return;
    }

    setLoading(true);
    setErro('');
    setMensagem('');

    try {
      const response = await fetch('/api/admin/limpar-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chaveSeguranca: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem(data.message);
        // Redirecionar para o dashboard após 3 segundos
        setTimeout(() => {
          router.push('/dashboard/formularios');
        }, 3000);
      } else {
        setErro(data.message || 'Erro ao limpar leads');
      }
    } catch (error: any) {
      setErro(error.message || 'Erro ao processar solicitação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Limpar Todos os Leads
            </h1>
            <p className="text-red-600 dark:text-red-400 font-medium mb-6">
              ATENÇÃO: Esta ação irá excluir permanentemente todos os leads do sistema.
              Esta ação não pode ser desfeita.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Chave de Administrador
              </label>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Digite a chave de administrador"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmacao" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirmação
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Digite "LIMPAR TODOS OS LEADS" para confirmar
              </p>
              <input
                id="confirmacao"
                type="text"
                value={confirmacao}
                onChange={(e) => setConfirmacao(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="LIMPAR TODOS OS LEADS"
                required
              />
            </div>

            {erro && (
              <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4">
                <p className="text-red-700 dark:text-red-400">{erro}</p>
              </div>
            )}

            {mensagem && (
              <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4">
                <p className="text-green-700 dark:text-green-400">{mensagem}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => router.push('/dashboard/formularios')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleLimparLeads}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {loading ? 'Processando...' : 'Limpar Todos os Leads'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
