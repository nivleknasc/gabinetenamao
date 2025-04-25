'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FormularioBuilder from '@/components/forms/FormularioBuilder';
import { Formulario, FormularioCampo } from '@/lib/supabase/client';

export default function NovoFormularioPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveFormulario = async (data: {
    nome: string;
    descricao: string;
    campos: FormularioCampo[];
  }) => {
    setIsSubmitting(true);
    
    try {
      // Em um ambiente real, você salvaria o formulário no Supabase
      // const { data: result, error } = await supabase.from('formularios').insert({
      //   nome: data.nome,
      //   descricao: data.descricao,
      //   campos: data.campos,
      //   created_at: new Date().toISOString(),
      // }).select();
      
      // Simulando o salvamento
      console.log('Formulário salvo:', data);
      
      // Redirecionar para a lista de formulários
      setTimeout(() => {
        router.push('/formularios');
      }, 1000);
    } catch (error) {
      console.error('Erro ao salvar formulário:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Novo Formulário</h1>
        
        <div className="mt-8">
          {isSubmitting ? (
            <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow">
              <p className="text-gray-500">Salvando formulário...</p>
            </div>
          ) : (
            <FormularioBuilder onSave={handleSaveFormulario} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
