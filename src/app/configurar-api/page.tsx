'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfigurarAPIPage() {
  const [openaiKey, setOpenaiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Carregar valor atual do localStorage
    const currentOpenaiKey = localStorage.getItem('OPENAI_API_KEY') || '';
    setOpenaiKey(currentOpenaiKey);
  }, []);

  const handleSaveConfig = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Salvar no localStorage
      localStorage.setItem('OPENAI_API_KEY', openaiKey);
      
      setMessage('Chave da API salva com sucesso! Você será redirecionado para a página de análise.');
      
      // Redirecionar após salvar
      setTimeout(() => {
        router.push('/dashboard/analise-ia');
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Erro ao salvar configurações');
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
              Configurar API da OpenAI
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Configure a chave da API da OpenAI para habilitar a análise de IA.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="openai-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                OpenAI API Key
              </label>
              <input
                id="openai-key"
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="sk-..."
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Obtenha sua chave em <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">platform.openai.com/api-keys</a>
              </p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4">
                <p className="text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            {message && (
              <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4">
                <p className="text-green-700 dark:text-green-400">{message}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveConfig}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Salvando...' : 'Salvar Configuração'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-md mx-auto mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Como obter uma chave da API da OpenAI
          </h2>
          
          <div className="prose dark:prose-invert max-w-none">
            <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Acesse <a href="https://platform.openai.com/signup" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">platform.openai.com/signup</a> e crie uma conta</li>
              <li>Após fazer login, clique no seu perfil no canto superior direito</li>
              <li>Selecione "View API keys" ou acesse <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">platform.openai.com/api-keys</a></li>
              <li>Clique em "+ Create new secret key"</li>
              <li>Dê um nome para sua chave (ex: "Gabinete na Mão")</li>
              <li>Copie a chave gerada (ela começa com "sk-")</li>
              <li>Cole a chave no campo acima e clique em "Salvar Configuração"</li>
            </ol>
            
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <strong>Importante:</strong> A OpenAI cobra pelo uso da API. Recomendamos configurar limites de uso para evitar cobranças inesperadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
