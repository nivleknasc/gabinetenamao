'use client';

import { useState } from 'react';
import Link from 'next/link';
import FormularioModelo from '@/components/forms/FormularioModelo';

export default function FormularioModeloPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Simular envio para API
      console.log('Dados do formulário:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormData(data);
      setSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Modelo de Formulário</h1>
        <Link
          href="/dashboard/formularios"
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Voltar
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Visualização do Formulário
          </h2>
          
          <div className="bg-gray-900 p-6 rounded-lg">
            {submitted ? (
              <div className="space-y-6">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  <p className="font-bold">Formulário enviado com sucesso!</p>
                  <p className="text-sm">Os dados foram recebidos e processados.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Dados Recebidos:</h3>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                    {JSON.stringify(formData, null, 2)}
                  </pre>
                </div>
                
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Testar Novamente
                </button>
              </div>
            ) : (
              <FormularioModelo onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
