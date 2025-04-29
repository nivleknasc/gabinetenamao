'use client';

import { useState, useEffect } from 'react';

export default function SupabaseDebug() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchDebugInfo = async () => {
      try {
        setLoading(true);
        
        // Buscar informações de depuração
        const envResponse = await fetch('/api/test-env');
        const envData = await envResponse.json();
        
        let supabaseData = null;
        try {
          const supabaseResponse = await fetch('/api/test-supabase');
          supabaseData = await supabaseResponse.json();
        } catch (err) {
          console.error('Erro ao buscar informações do Supabase:', err);
        }
        
        setDebugInfo({
          env: envData,
          supabase: supabaseData,
          browser: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            cookiesEnabled: navigator.cookieEnabled,
          },
        });
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDebugInfo();
  }, []);
  
  if (loading) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">Carregando informações de depuração...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
        <p className="text-red-700 dark:text-red-300">Erro: {error}</p>
      </div>
    );
  }
  
  const supabaseConnected = debugInfo?.supabase?.success;
  
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Status do Supabase</h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {showDetails ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
        </button>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full mr-2 ${supabaseConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <p className="text-gray-700 dark:text-gray-300">
            Supabase: {supabaseConnected ? 'Conectado' : 'Desconectado'}
          </p>
        </div>
        
        <div className="flex items-center mt-2">
          <div className={`h-3 w-3 rounded-full mr-2 ${debugInfo?.env?.supabaseUrl ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <p className="text-gray-700 dark:text-gray-300">
            URL do Supabase: {debugInfo?.env?.supabaseUrl ? 'Configurada' : 'Não configurada'}
          </p>
        </div>
        
        <div className="flex items-center mt-2">
          <div className={`h-3 w-3 rounded-full mr-2 ${debugInfo?.env?.supabaseKeyExists ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <p className="text-gray-700 dark:text-gray-300">
            Chave do Supabase: {debugInfo?.env?.supabaseKeyExists ? 'Configurada' : 'Não configurada'}
          </p>
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Detalhes</h4>
          
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-96">
            <pre className="text-xs text-gray-800 dark:text-gray-200">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Solução de Problemas</h4>
            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>Verifique se as variáveis de ambiente estão configuradas corretamente no arquivo <code>.env.local</code></li>
              <li>Certifique-se de que o servidor foi reiniciado após a alteração do arquivo <code>.env.local</code></li>
              <li>Verifique se as tabelas foram criadas corretamente no Supabase</li>
              <li>Verifique se há erros no console do navegador (F12 &gt; Console)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
