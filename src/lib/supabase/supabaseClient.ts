import { createClient } from '@supabase/supabase-js';

// Função para criar um cliente Supabase seguro
const createSafeClient = () => {
  try {
    // Essas variáveis devem ser definidas no arquivo .env.local
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    // Verificar se as variáveis de ambiente estão definidas
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn(
        'As variáveis de ambiente do Supabase não estão configuradas. ' +
        'Certifique-se de definir NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no arquivo .env.local'
      );

      // Adicionar mais informações para depuração
      console.error('Detalhes do erro:');
      console.error('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl || 'vazio');
      console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY existe:', !!supabaseAnonKey);

      // Retornar um cliente mock para evitar erros
      return {
        from: () => ({
          select: () => ({ data: null, error: { message: 'Configuração do Supabase incompleta' } }),
          insert: () => ({ data: null, error: { message: 'Configuração do Supabase incompleta' } }),
          update: () => ({ data: null, error: { message: 'Configuração do Supabase incompleta' } }),
          delete: () => ({ data: null, error: { message: 'Configuração do Supabase incompleta' } }),
          eq: () => ({ data: null, error: { message: 'Configuração do Supabase incompleta' } }),
        }),
        rpc: () => ({ data: null, error: { message: 'Configuração do Supabase incompleta' } }),
      };
    }

    // Criar o cliente Supabase
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Erro ao criar cliente Supabase:', error);

    // Retornar um cliente mock para evitar erros
    return {
      from: () => ({
        select: () => ({ data: null, error: { message: 'Erro ao criar cliente Supabase' } }),
        insert: () => ({ data: null, error: { message: 'Erro ao criar cliente Supabase' } }),
        update: () => ({ data: null, error: { message: 'Erro ao criar cliente Supabase' } }),
        delete: () => ({ data: null, error: { message: 'Erro ao criar cliente Supabase' } }),
        eq: () => ({ data: null, error: { message: 'Erro ao criar cliente Supabase' } }),
      }),
      rpc: () => ({ data: null, error: { message: 'Erro ao criar cliente Supabase' } }),
    };
  }
};

// Exportar o cliente Supabase
export const supabase = createSafeClient();
