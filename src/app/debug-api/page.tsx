'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DebugAPIPage() {
  const [apiKey, setApiKey] = useState<string>('');
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar se estamos no navegador
    if (typeof window !== 'undefined') {
      const storedKey = localStorage.getItem('OPENAI_API_KEY') || '';
      setApiKey(storedKey);
    }
  }, []);

  const testAPI = async () => {
    setIsLoading(true);
    try {
      // Testar a API diretamente
      const response = await fetch(`/api/test-openai?key=${encodeURIComponent(apiKey)}`);
      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      console.error('Erro ao testar API:', error);
      setTestResult({ success: false, message: 'Erro ao conectar com a API: ' + (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Depuração da API da OpenAI
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Esta página ajuda a diagnosticar problemas com a API da OpenAI
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Chave da API armazenada
              </h2>
              <p className="text-gray-600 dark:text-gray-400 break-all">
                {apiKey ?
                  `${apiKey.substring(0, 7)}...${apiKey.substring(apiKey.length - 4)}` :
                  'Nenhuma chave encontrada no localStorage'}
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={testAPI}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Testando...' : 'Testar Conexão com API'}
              </button>
            </div>

            {testResult && (
              <div className={`mt-4 p-4 rounded-lg ${testResult.success ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
                <h3 className={`text-lg font-medium ${testResult.success ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'} mb-2`}>
                  {testResult.success ? 'Conexão bem-sucedida!' : 'Falha na conexão'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {testResult.message}
                </p>
                {testResult.response && (
                  <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    <p className="text-gray-800 dark:text-gray-200">
                      Resposta: {testResult.response}
                    </p>
                  </div>
                )}
                <pre className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => router.push('/configurar-api')}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Voltar para Configuração
              </button>
              <button
                onClick={() => router.push('/dashboard/analise-ia')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Ir para Análise IA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
