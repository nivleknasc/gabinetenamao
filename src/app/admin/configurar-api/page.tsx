'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfigurarAPIPage() {
  const [openaiKey, setOpenaiKey] = useState('');
  const [mailgunKey, setMailgunKey] = useState('');
  const [mailgunDomain, setMailgunDomain] = useState('');
  const [webhookSecret, setWebhookSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Carregar valores atuais das variáveis de ambiente (se disponíveis no cliente)
    const currentOpenaiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
    const currentMailgunKey = process.env.NEXT_PUBLIC_MAILGUN_API_KEY || '';
    const currentMailgunDomain = process.env.NEXT_PUBLIC_MAILGUN_DOMAIN || '';
    const currentWebhookSecret = process.env.NEXT_PUBLIC_WEBHOOK_SECRET || '';

    setOpenaiKey(currentOpenaiKey);
    setMailgunKey(currentMailgunKey);
    setMailgunDomain(currentMailgunDomain);
    setWebhookSecret(currentWebhookSecret);
  }, []);

  const handleSaveConfig = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Aqui você pode implementar a lógica para salvar as configurações
      // Como não podemos modificar as variáveis de ambiente diretamente no cliente,
      // você precisaria de uma API no servidor para fazer isso
      
      // Esta é uma simulação - em um ambiente real, você enviaria para uma API
      localStorage.setItem('OPENAI_API_KEY', openaiKey);
      localStorage.setItem('MAILGUN_API_KEY', mailgunKey);
      localStorage.setItem('MAILGUN_DOMAIN', mailgunDomain);
      localStorage.setItem('WEBHOOK_SECRET', webhookSecret);
      
      setMessage('Configurações salvas localmente. Para aplicá-las globalmente, você precisa atualizar as variáveis de ambiente no servidor.');
      
      // Em um ambiente real, você redirecionaria após salvar
      // setTimeout(() => {
      //   router.push('/dashboard');
      // }, 2000);
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
              Configurar APIs
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Configure as chaves de API necessárias para o funcionamento do sistema.
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

            <div>
              <label htmlFor="mailgun-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mailgun API Key
              </label>
              <input
                id="mailgun-key"
                type="password"
                value={mailgunKey}
                onChange={(e) => setMailgunKey(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="key-..."
              />
            </div>

            <div>
              <label htmlFor="mailgun-domain" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mailgun Domain
              </label>
              <input
                id="mailgun-domain"
                type="text"
                value={mailgunDomain}
                onChange={(e) => setMailgunDomain(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="mg.seudominio.com"
              />
            </div>

            <div>
              <label htmlFor="webhook-secret" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Webhook Secret
              </label>
              <input
                id="webhook-secret"
                type="password"
                value={webhookSecret}
                onChange={(e) => setWebhookSecret(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Chave secreta para webhooks"
              />
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
                {loading ? 'Salvando...' : 'Salvar Configurações'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-md mx-auto mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Instruções para configuração no Vercel
          </h2>
          
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Para configurar as variáveis de ambiente no Vercel, siga estes passos:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Acesse o painel do Vercel</li>
              <li>Selecione seu projeto</li>
              <li>Vá para "Settings" &gt; "Environment Variables"</li>
              <li>Adicione as seguintes variáveis:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">NEXT_PUBLIC_OPENAI_API_KEY</code></li>
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">NEXT_PUBLIC_MAILGUN_API_KEY</code></li>
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">NEXT_PUBLIC_MAILGUN_DOMAIN</code></li>
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">NEXT_PUBLIC_WEBHOOK_SECRET</code></li>
                </ul>
              </li>
              <li>Clique em "Save" e depois redeploy seu projeto</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
