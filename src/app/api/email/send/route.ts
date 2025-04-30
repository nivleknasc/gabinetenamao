import { NextResponse } from 'next/server';

// Função para enviar email usando SendGrid
async function sendEmail(to: string, subject: string, html: string, from: string) {
  // Verificar se a API key do SendGrid está configurada
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    throw new Error('SENDGRID_API_KEY não está configurada nas variáveis de ambiente');
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to }],
            subject: subject,
          },
        ],
        from: { email: from },
        content: [
          {
            type: 'text/html',
            value: html,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro ao enviar email: ${JSON.stringify(errorData)}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
}

// Rota de API para enviar email
export async function POST(request: Request) {
  try {
    // Verificar se a chave de segurança está configurada
    const webhookSecret = process.env.WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json(
        { success: false, message: 'WEBHOOK_SECRET não está configurada' },
        { status: 500 }
      );
    }

    // Obter dados da requisição
    const data = await request.json();
    
    // Verificar a chave de segurança
    if (data.secret !== webhookSecret) {
      return NextResponse.json(
        { success: false, message: 'Chave de segurança inválida' },
        { status: 401 }
      );
    }

    // Verificar se os dados necessários estão presentes
    if (!data.to || !data.subject || !data.html || !data.from) {
      return NextResponse.json(
        { success: false, message: 'Dados incompletos para envio de email' },
        { status: 400 }
      );
    }

    // Enviar o email
    await sendEmail(data.to, data.subject, data.html, data.from);

    return NextResponse.json({
      success: true,
      message: 'Email enviado com sucesso',
    });
  } catch (error: any) {
    console.error('Erro ao processar solicitação de email:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Erro ao enviar email' },
      { status: 500 }
    );
  }
}
