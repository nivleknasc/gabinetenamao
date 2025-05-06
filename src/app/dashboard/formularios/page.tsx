'use client';

import { useState, useEffect } from 'react';
import FormulariosList from '@/components/forms/FormulariosList';
import { Formulario } from '@/lib/supabase/client';
import { getFormularios, deleteFormulario } from '@/lib/supabase/formularioService';
import SupabaseDebug from '@/components/debug/SupabaseDebug';

export default function FormulariosPage() {
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        setIsLoading(true);

        // Buscar formulários do Supabase (sem inicializar com dados de exemplo)
        const formulariosList = await getFormularios();

        setFormularios(formulariosList);
      } catch (error) {
        console.error('Erro ao buscar formulários:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormularios();
  }, []);

  const handleDeleteFormulario = async (id: string) => {
    try {
      // Excluir o formulário do Supabase
      const success = await deleteFormulario(id);

      if (success) {
        // Atualizar a lista de formulários
        setFormularios(formularios.filter((form) => form.id !== id));
      }
    } catch (error) {
      console.error('Erro ao excluir formulário:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Formulários</h1>

      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">Carregando formulários...</p>
          </div>
        ) : (
          <FormulariosList
            formularios={formularios}
            onDelete={handleDeleteFormulario}
          />
        )}
      </div>
    </div>
  );
}
