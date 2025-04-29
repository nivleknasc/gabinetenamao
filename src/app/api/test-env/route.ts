import { NextResponse } from 'next/server';

export async function GET() {
  // Verificar as variáveis de ambiente
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // Retornar as informações (sem mostrar a chave completa por segurança)
  return NextResponse.json({
    supabaseUrl,
    supabaseKeyExists: !!supabaseKey,
    supabaseKeyLength: supabaseKey?.length || 0,
    supabaseKeyStart: supabaseKey?.substring(0, 10) + '...',
  });
}
