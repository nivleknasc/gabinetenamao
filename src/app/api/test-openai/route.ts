import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET() {
  try {
    // Verificar se a chave da API está configurada
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        message: 'NEXT_PUBLIC_OPENAI_API_KEY não está configurada nas variáveis de ambiente',
        isConfigured: false
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
