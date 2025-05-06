import { supabase } from './client';

export interface FormSubmission {
  id?: string;
  formulario_id: string;
  dados: Record<string, any>;
  created_at?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  cidade?: string;
  estado?: string;
  bairro?: string;
  cep?: string;
  endereco?: string;
  ip_address?: string;
  user_agent?: string;
}

/**
 * Salva uma nova submissão de formulário no Supabase
 * @param submission Dados da submissão
 * @returns A submissão salva ou null em caso de erro
 */
export async function saveFormSubmission(submission: FormSubmission): Promise<FormSubmission | null> {
  try {
    // Extrair informações específicas dos dados para facilitar consultas
    const dadosProcessados = { ...submission.dados };
    
    // Extrair campos comuns para colunas específicas
    const submissionData: FormSubmission = {
      formulario_id: submission.formulario_id,
      dados: dadosProcessados,
      created_at: new Date().toISOString(),
      nome: extractField(submission.dados, ['nome', 'name']),
      email: extractField(submission.dados, ['email', 'e-mail']),
      telefone: extractField(submission.dados, ['telefone', 'phone', 'celular']),
      cidade: extractField(submission.dados, ['cidade', 'city']),
      estado: extractField(submission.dados, ['estado', 'state', 'uf']),
      bairro: extractField(submission.dados, ['bairro', 'neighborhood']),
      cep: extractField(submission.dados, ['cep', 'zip', 'zipcode']),
      endereco: extractField(submission.dados, ['endereco', 'endereço', 'address']),
      ip_address: submission.ip_address,
      user_agent: submission.user_agent
    };

    // Inserir no Supabase
    const { data, error } = await supabase
      .from('form_submissions')
      .insert(submissionData)
      .select()
      .single();

    if (error) {
      console.error('Erro ao salvar submissão:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao processar submissão:', error);
    return null;
  }
}

/**
 * Busca todas as submissões de um formulário específico
 * @param formularioId ID do formulário
 * @returns Lista de submissões ou array vazio em caso de erro
 */
export async function getFormSubmissions(formularioId: string): Promise<FormSubmission[]> {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('formulario_id', formularioId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar submissões:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao processar busca de submissões:', error);
    return [];
  }
}

/**
 * Busca uma submissão específica pelo ID
 * @param submissionId ID da submissão
 * @returns A submissão ou null em caso de erro
 */
export async function getSubmissionById(submissionId: string): Promise<FormSubmission | null> {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (error) {
      console.error('Erro ao buscar submissão:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao processar busca de submissão:', error);
    return null;
  }
}

/**
 * Extrai um campo dos dados da submissão, verificando várias possíveis chaves
 * @param data Dados da submissão
 * @param possibleKeys Possíveis chaves para o campo
 * @returns O valor do campo ou undefined
 */
function extractField(data: Record<string, any>, possibleKeys: string[]): string | undefined {
  for (const key of possibleKeys) {
    // Verificar chaves exatas
    if (data[key] !== undefined) {
      return data[key];
    }
    
    // Verificar chaves case-insensitive
    const lowerKey = key.toLowerCase();
    const matchingKey = Object.keys(data).find(k => k.toLowerCase() === lowerKey);
    if (matchingKey && data[matchingKey] !== undefined) {
      return data[matchingKey];
    }
  }
  
  return undefined;
}

/**
 * Conta o número total de submissões para um formulário
 * @param formularioId ID do formulário
 * @returns Número de submissões
 */
export async function countFormSubmissions(formularioId: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('form_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('formulario_id', formularioId);

    if (error) {
      console.error('Erro ao contar submissões:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Erro ao processar contagem de submissões:', error);
    return 0;
  }
}

/**
 * Busca as submissões mais recentes de todos os formulários
 * @param limit Número máximo de submissões a retornar
 * @returns Lista de submissões recentes
 */
export async function getRecentSubmissions(limit: number = 10): Promise<FormSubmission[]> {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Erro ao buscar submissões recentes:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao processar busca de submissões recentes:', error);
    return [];
  }
}
