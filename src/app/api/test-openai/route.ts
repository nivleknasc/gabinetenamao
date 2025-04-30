import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    // Verificar se a chave da API está configurada
    // Tentamos obter a chave da API das variáveis de ambiente
    let apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    // Se não encontrarmos nas variáveis de ambiente, verificamos se foi passada na URL
    if (!apiKey) {
      const url = new URL(request.url);
      const keyFromUrl = url.searchParams.get('key');
      if (keyFromUrl) {
        apiKey = keyFromUrl;
      }
    }

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        message: 'Chave da API da OpenAI não encontrada. Configure a chave na página de configuração.',
        isConfigured: false,
        env: process.env.NODE_ENV
      }, { status: 400 });
    }

    // Inicializar o cliente OpenAI
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    // Fazer uma chamada simples para testar a conexão
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Modelo mais barato para teste
      messages: [
        {
          role: "system",
          content: "Você é um assistente útil."
        },
        {
          role: "user",
          content: "Diga 'Conexão com OpenAI funcionando corretamente!' em português."
        }
      ],
      max_tokens: 50
    });

    // Verificar se a resposta foi bem-sucedida
    if (response && response.choices && response.choices.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Conexão com a API da OpenAI estabelecida com sucesso',
        response: response.choices[0].message.content,
        isConfigured: true
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Resposta da API da OpenAI está vazia ou em formato inesperado',
        isConfigured: true
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Erro ao testar conexão com OpenAI:', error);

    return NextResponse.json({
      success: false,
      message: `Erro ao conectar à API da OpenAI: ${error.message}`,
      error: error.message,
      isConfigured: true
    }, { status: 500 });
  }
}
