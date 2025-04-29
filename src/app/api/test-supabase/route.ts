import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/supabaseClient';

export async function GET() {
  try {
    // Verificar a conexão com o Supabase
    const { data, error } = await supabase.from('formularios').select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      return NextResponse.json({
        success: false,
        message: 'Erro ao conectar ao Supabase',
        error: error.message,
        hint: error.hint,
        code: error.code,
        details: error.details,
      }, { status: 500 });
    }
    
    // Verificar se a tabela existe
    return NextResponse.json({
      success: true,
      message: 'Conexão com o Supabase estabelecida com sucesso',
      count: data,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Erro ao conectar ao Supabase',
      error: error.message,
    }, { status: 500 });
  }
}
