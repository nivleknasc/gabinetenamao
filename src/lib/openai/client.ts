import OpenAI from 'openai';
import { Lead } from '@/lib/supabase/client';

// Função para obter o cliente OpenAI
function getOpenAIClient() {
  // Verificar se a chave da API está disponível
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';

  if (!apiKey) {
    console.warn('NEXT_PUBLIC_OPENAI_API_KEY não está configurada nas variáveis de ambiente');
    return null;
  }

  try {
    return new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Permitir uso no navegador
    });
  } catch (error) {
    console.error('Erro ao inicializar o cliente OpenAI:', error);
    return null;
  }
}

// Interface para os resultados da análise
export interface AnaliseIA {
  resumo: string;
  insights: string[];
  tendencias: {
    titulo: string;
    descricao: string;
    porcentagem?: number;
  }[];
  recomendacoes: string[];
  comparacaoVotacao?: {
    resumo: string;
    insights: string[];
    recomendacoes: string[];
  };
}

/**
 * Analisa os leads usando a API da OpenAI para gerar insights
 * @param leads Lista de leads para análise
 * @param incluirComparacao Se deve incluir comparação com dados de votação
 * @returns Objeto com análises e insights
 */
export async function analisarLeadsComIA(
  leads: Lead[],
  incluirComparacao: boolean = false
): Promise<AnaliseIA> {
  try {
    // Preparar os dados para enviar para a API
    const dadosLeads = leads.map(lead => ({
      id: lead.id,
      nome: lead.nome,
      cidade: lead.cidade,
      estado: lead.estado,
      bairro: lead.bairro,
      data_captacao: lead.data_captacao,
    }));

    // Construir o prompt para a API
    let prompt = `
      Você é um assistente especializado em análise política e eleitoral para o Deputado Federal Mauricio Neves (PP-SP).
      Analise os seguintes dados de leads capturados pelo gabinete:

      ${JSON.stringify(dadosLeads, null, 2)}

      Forneça uma análise detalhada incluindo:
      1. Um resumo conciso da situação atual dos leads
      2. Insights relevantes sobre a distribuição geográfica
      3. Tendências identificadas nos dados
      4. Recomendações estratégicas para melhorar a captação de leads
    `;

    if (incluirComparacao) {
      prompt += `
        5. Compare esses leads com a base de votação do Deputado Mauricio Neves nas últimas eleições.
        Identifique regiões onde há potencial de crescimento e onde já existe uma base forte.
        Sugira estratégias específicas para cada região.
      `;
    }

    // Obter o cliente OpenAI
    const openai = getOpenAIClient();

    // Verificar se o cliente OpenAI está disponível
    if (!openai) {
      throw new Error("Cliente OpenAI não está disponível. Verifique se a chave da API está configurada corretamente.");
    }

    // Chamar a API da OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um analista político especializado em estratégia eleitoral e análise de dados."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    // Processar a resposta
    const conteudoResposta = response.choices[0].message.content || '';

    // Estruturar a resposta em um formato utilizável
    // Esta é uma implementação simplificada - em produção, você pode querer
    // usar uma abordagem mais robusta para analisar o texto
    const analise: AnaliseIA = {
      resumo: extrairSecao(conteudoResposta, "resumo") || "Análise não disponível",
      insights: extrairLista(conteudoResposta, "insights"),
      tendencias: extrairTendencias(conteudoResposta),
      recomendacoes: extrairLista(conteudoResposta, "recomendações"),
    };

    if (incluirComparacao) {
      analise.comparacaoVotacao = {
        resumo: extrairSecao(conteudoResposta, "comparação") || "Comparação não disponível",
        insights: extrairLista(conteudoResposta, "comparação insights"),
        recomendacoes: extrairLista(conteudoResposta, "comparação recomendações"),
      };
    }

    return analise;
  } catch (error) {
    console.error('Erro ao analisar leads com IA:', error);
    return {
      resumo: "Não foi possível realizar a análise neste momento.",
      insights: ["Erro na comunicação com a API de IA."],
      tendencias: [{
        titulo: "Erro na análise",
        descricao: "Não foi possível processar as tendências."
      }],
      recomendacoes: ["Tente novamente mais tarde."],
    };
  }
}

// Funções auxiliares para extrair informações da resposta da IA

function extrairSecao(texto: string, tipo: string): string | null {
  // Implementação simplificada - em produção, use regex mais robustos
  const lowerTexto = texto.toLowerCase();

  if (tipo === "resumo") {
    // Tenta encontrar um parágrafo que contenha palavras-chave de resumo
    const paragrafos = texto.split('\n\n');
    for (const paragrafo of paragrafos) {
      if (
        paragrafo.toLowerCase().includes('resumo') ||
        paragrafo.toLowerCase().includes('situação atual') ||
        paragrafo.toLowerCase().includes('análise geral')
      ) {
        return paragrafo;
      }
    }
    // Se não encontrar um parágrafo específico, retorna o primeiro
    return paragrafos[0] || null;
  }

  if (tipo === "comparação") {
    // Tenta encontrar seções relacionadas à comparação com votação
    if (lowerTexto.includes('comparação')) {
      const partes = texto.split(/comparação|comparando|compare/i);
      if (partes.length > 1) {
        return partes[1].split('\n\n')[0].trim();
      }
    }
  }

  return null;
}

function extrairLista(texto: string, tipo: string): string[] {
  const lowerTexto = texto.toLowerCase();
  const linhas = texto.split('\n');
  const resultados: string[] = [];

  let capturando = false;

  // Identificar seções baseadas no tipo
  for (const linha of linhas) {
    const lowerLinha = linha.toLowerCase();

    // Iniciar captura baseada no tipo
    if (!capturando) {
      if (
        (tipo === "insights" && (lowerLinha.includes('insight') || lowerLinha.includes('análise'))) ||
        (tipo === "recomendações" && (lowerLinha.includes('recomend') || lowerLinha.includes('estratégia'))) ||
        (tipo === "comparação insights" && lowerLinha.includes('comparação') && lowerLinha.includes('insight')) ||
        (tipo === "comparação recomendações" && lowerLinha.includes('comparação') && lowerLinha.includes('recomend'))
      ) {
        capturando = true;
        continue;
      }
    }

    // Parar de capturar quando encontrar a próxima seção
    if (capturando) {
      if (
        lowerLinha.includes('resumo:') ||
        lowerLinha.includes('tendências:') ||
        (tipo !== "recomendações" && lowerLinha.includes('recomend')) ||
        (tipo !== "insights" && lowerLinha.includes('insight')) ||
        lowerLinha.includes('conclusão:')
      ) {
        break;
      }

      // Capturar itens de lista (começando com número, hífen, asterisco)
      if (/^\s*(\d+[\.\)]\s*|\-\s*|\*\s*)/.test(linha) && linha.trim().length > 2) {
        // Remover o marcador de lista e adicionar o item
        const item = linha.replace(/^\s*(\d+[\.\)]\s*|\-\s*|\*\s*)/, '').trim();
        if (item) {
          resultados.push(item);
        }
      }
    }
  }

  // Se não encontrou nada, tenta uma abordagem mais simples
  if (resultados.length === 0) {
    // Procura por qualquer linha que pareça um item de lista
    for (const linha of linhas) {
      if (/^\s*(\d+[\.\)]\s*|\-\s*|\*\s*)/.test(linha) && linha.trim().length > 2) {
        const item = linha.replace(/^\s*(\d+[\.\)]\s*|\-\s*|\*\s*)/, '').trim();
        if (item) {
          resultados.push(item);
        }
      }
    }
  }

  // Se ainda não encontrou nada, retorna alguns itens padrão
  if (resultados.length === 0) {
    if (tipo.includes('insight')) {
      return [
        "Análise de dados insuficiente para gerar insights precisos",
        "Considere coletar mais dados para uma análise mais detalhada"
      ];
    } else if (tipo.includes('recomend')) {
      return [
        "Ampliar a coleta de dados em regiões estratégicas",
        "Implementar campanhas direcionadas baseadas na localização dos leads"
      ];
    }
  }

  return resultados;
}

function extrairTendencias(texto: string): { titulo: string; descricao: string; porcentagem?: number }[] {
  const tendencias: { titulo: string; descricao: string; porcentagem?: number }[] = [];
  const linhas = texto.split('\n');

  let capturandoTendencias = false;

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].toLowerCase();

    // Identificar seção de tendências
    if (!capturandoTendencias && linha.includes('tendência')) {
      capturandoTendencias = true;
      continue;
    }

    // Parar quando encontrar a próxima seção
    if (capturandoTendencias) {
      if (
        linha.includes('recomendação') ||
        linha.includes('conclusão') ||
        linha.includes('comparação')
      ) {
        break;
      }

      // Capturar itens de tendência (começando com número, hífen, asterisco)
      if (/^\s*(\d+[\.\)]\s*|\-\s*|\*\s*)/.test(linhas[i]) && linhas[i].trim().length > 2) {
        const tendenciaTexto = linhas[i].replace(/^\s*(\d+[\.\)]\s*|\-\s*|\*\s*)/, '').trim();

        // Tentar extrair um título e descrição
        const partes = tendenciaTexto.split(':');
        if (partes.length > 1) {
          const titulo = partes[0].trim();
          const descricao = partes.slice(1).join(':').trim();

          // Tentar extrair porcentagem se existir
          const porcentagemMatch = descricao.match(/(\d+)%/);
          const porcentagem = porcentagemMatch ? parseInt(porcentagemMatch[1]) : undefined;

          tendencias.push({ titulo, descricao, porcentagem });
        } else {
          // Se não conseguir dividir, usa o texto completo como título
          tendencias.push({
            titulo: tendenciaTexto.substring(0, 30) + (tendenciaTexto.length > 30 ? '...' : ''),
            descricao: tendenciaTexto
          });
        }
      }
    }
  }

  // Se não encontrou tendências, cria algumas genéricas
  if (tendencias.length === 0) {
    return [
      {
        titulo: "Concentração geográfica",
        descricao: "Os leads estão concentrados em determinadas regiões, indicando potencial para expansão."
      },
      {
        titulo: "Sazonalidade na captação",
        descricao: "Há variações na captação de leads ao longo do tempo que podem ser exploradas estrategicamente."
      }
    ];
  }

  return tendencias;
}
