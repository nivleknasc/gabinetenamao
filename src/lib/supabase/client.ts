import { createClient } from '@supabase/supabase-js';

// Essas variáveis de ambiente precisarão ser configuradas no arquivo .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Criando o cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para os dados do lead
export type Lead = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
  bairro: string;
  latitude: number | null;
  longitude: number | null;
  data_captacao: string;
  formulario_id: string;
  created_at: string;
};

// Tipo para a aparência do formulário
export type FormularioAparencia = {
  mostrarCabecalho: boolean;
  mostrarDescricaoInicio: boolean;
  mostrarDescricaoFim: boolean;
  corFundo: string;
  corTexto: string;
  corBotao: string;
  fundoEscuro: boolean;
};

// Tipos para os dados do formulário
export type Formulario = {
  id: string;
  nome: string;
  descricao: string;
  campos: FormularioCampo[];
  imagemUrl?: string;
  publicUrl?: string;
  created_at: string;
  aparencia?: FormularioAparencia;
};

export type FormularioCampo = {
  id: string;
  nome: string;
  tipo: 'texto' | 'email' | 'telefone' | 'select' | 'checkbox' | 'radio';
  obrigatorio: boolean;
  opcoes?: string[]; // Para campos do tipo select, checkbox ou radio
};
