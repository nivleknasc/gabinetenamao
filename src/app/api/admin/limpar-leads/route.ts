import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/supabaseClient';

// Esta é uma rota de administração que deve ser protegida
// Em um ambiente de produção, você deve adicionar autenticação adequada
export async function POST(request: Request) {
  try {
    // Verificar se a solicitação contém uma chave de segurança
    // Esta é uma implementação básica de segurança
    // Em produção, use um sistema de autenticação adequado
    const { chaveSeguranca } = await request.json();
    
    // Defina uma chave de segurança forte
    // Esta chave deve ser alterada para uma string aleatória e complexa
    const CHAVE_ADMIN = 'gabinetenamao-admin-2024';
    
    if (chaveSeguranca !== CHAVE_ADMIN) {
      return NextResponse.json(
        { success: false, message: 'Acesso não autorizado' },
        { status: 401 }
      );
    }
    
    // Limpar todos os leads
    const { error } = await supabase.from('leads').delete().neq('id', '');
    
    if (error) {
      console.error('Erro ao limpar leads:', error);
      return NextResponse.json(
        { success: false, message: 'Erro ao limpar leads', error: error.message },
        { status: 500 }
      );
    }
    
    // Verificar se os leads foram realmente excluídos
    const { data: contagem, error: erroContagem } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });
    
    if (erroContagem) {
      console.error('Erro ao verificar contagem de leads:', erroContagem);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Todos os leads foram excluídos com sucesso',
      contagem: contagem
    });
  } catch (error: any) {
    console.error('Erro ao processar solicitação:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao processar solicitação', error: error.message },
      { status: 500 }
    );
  }
}
